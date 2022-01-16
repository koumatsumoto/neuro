import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ifNonEmpty } from '../../utils';
import { createKeyDownHandlers, deserialize, resetNodes, serialize } from './internal';

const defaultEditorValue = [{ children: [{ text: '' }] }];
const noop = (...args: unknown[]) => {};

export const NeuroEditor = ({ text = '', onSave = noop, onBlur = noop }: { text?: string; onSave?: (text: string) => void; onBlur?: (text: string) => void }) => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(defaultEditorValue);

  // load previous text once initialized
  useEffect(() => {
    ifNonEmpty(text, (tx) => resetNodes(editor, { nodes: deserialize(tx) }));
  }, [editor, text]);

  const onEditorChange = (newNodes: Descendant[]) => {
    setEditorValue(newNodes);
  };

  const keydownCallback = useMemo(
    () =>
      createKeyDownHandlers(editor, {
        onSaveCommand: () => onSave(serialize(editor.children)),
      }),
    [editor],
  );
  const blurCallback = useCallback(() => onBlur(serialize(editor.children)), [editor]);

  return (
    <Slate editor={editor} value={editorValue} onChange={onEditorChange}>
      <Editable onKeyDown={keydownCallback} onBlur={blurCallback} />
    </Slate>
  );
};
