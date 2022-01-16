import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ifNonNullable } from '../utils';
import { createKeyDownHandlers, deserialize, load, resetNodes, save, serialize } from './internal';

const defaultEditorValue = [{ children: [{ text: 'A line of text in the Editor.' }] }];

export const NeuroEditor = () => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(defaultEditorValue);

  // load previous text once initialized
  useEffect(() => {
    ifNonNullable(load(), (text) => resetNodes(editor, { nodes: deserialize(text) }));
  }, [editor]);
  // save last text every changes
  const onChange = (newValues: Descendant[]) => {
    setEditorValue(newValues);
    save(serialize(newValues));
  };

  return (
    <Slate editor={editor} value={editorValue} onChange={onChange}>
      <Editable onKeyDown={useMemo(() => createKeyDownHandlers(editor), [editor])} />
    </Slate>
  );
};
