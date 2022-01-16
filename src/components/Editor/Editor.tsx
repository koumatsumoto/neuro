import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { useAppService } from '../../common';
import { ifNonNullable } from '../../utils';
import { createKeyDownHandlers, resetNodes, transformNodesToNote, transformNoteToNodes } from './internal';

const defaultEditorValue = [{ children: [{ text: 'A line of text in the Editor.' }] }];

export const NeuroEditor = () => {
  const service = useAppService();
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(defaultEditorValue);

  // load previous text once initialized
  useEffect(() => {
    ifNonNullable(service.loadLastNotes(), (note) => {
      resetNodes(editor, { nodes: transformNoteToNodes(note) });
    });
  }, [editor]);

  const onEditorChange = (newNodes: Descendant[]) => {
    setEditorValue(newNodes);
  };

  const onKeyDown = useMemo(
    () =>
      createKeyDownHandlers(editor, {
        onSaveCommand: () => service.saveNewNote(transformNodesToNote(editor.children)),
      }),
    [editor],
  );

  return (
    <Slate editor={editor} value={editorValue} onChange={onEditorChange}>
      <Editable onKeyDown={onKeyDown} />
    </Slate>
  );
};
