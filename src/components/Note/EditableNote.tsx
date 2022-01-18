import Paper from '@mui/material/Paper';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { Note } from '../../common';
import { noop } from '../../utils';
import { deserialize, disableBrowserShortcuts, disableTabKey, serialize } from './internal';

const emptyEditorValue = [{ children: [{ text: '' }] }];

export const EditableNote = ({ data, onBlur = noop, onChange = noop }: { data: Note; onBlur?: (text: string) => void; onChange?: (text: string) => void }) => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(data.text ? deserialize(data.text) : emptyEditorValue);

  const handleChange = (newNodes: Descendant[]) => {
    setEditorValue(newNodes);
    onChange(serialize(newNodes));
  };

  const handleKeydown = useCallback((ev: React.KeyboardEvent) => {
    disableTabKey(ev);
    disableBrowserShortcuts(ev);
  }, []);

  const handleBlur = useCallback(() => {
    onBlur(serialize(editor.children));
  }, [editor, onBlur]);

  return (
    <Paper elevation={2} sx={{ width: '600px', maxWidth: '100%', padding: '24px' }}>
      <Slate editor={editor} value={editorValue} onChange={handleChange}>
        <Editable onKeyDown={handleKeydown} onBlur={handleBlur} />
      </Slate>
    </Paper>
  );
};
