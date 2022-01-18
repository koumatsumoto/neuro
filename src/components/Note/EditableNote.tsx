import Paper from '@mui/material/Paper';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { Note, useSetEditorController } from '../../common';
import { EditorController } from '../../common/EditorController';
import { noop } from '../../utils';
import { deserialize, disableBrowserShortcuts, disableTabKey, serialize } from './internal';

const emptyEditorValue = [{ children: [{ text: '' }] }];

export const EditableNote = ({
  data,
  onFocus = noop,
  onBlur = noop,
  onChange = noop,
}: {
  data: Note;
  onFocus?: () => void;
  onBlur?: (text: string) => void;
  onChange?: (text: string) => void;
}) => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(data.text ? deserialize(data.text) : emptyEditorValue);
  const setEditorController = useSetEditorController();

  const handleChange = (newNodes: Descendant[]) => {
    setEditorValue(newNodes);
    onChange(serialize(newNodes));
  };

  const handleKeydown = useCallback((ev: React.KeyboardEvent) => {
    disableTabKey(ev);
    disableBrowserShortcuts(ev);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      // for EditorToolbar buttons operations
      if (!ReactEditor.isFocused(editor)) {
        onBlur(serialize(editor.children));
      }
    }, 160);
  }, [editor, onBlur]);

  const handleFocus = useCallback(() => {
    setEditorController(new EditorController(editor));
    onFocus();
  }, [setEditorController, editor, onFocus]);

  return (
    <Paper
      elevation={2}
      sx={{
        width: '600px',
        maxWidth: '100%',
        padding: '18px 16px 24px',
        '& *': {
          fontSize: '13px',
        },
      }}
    >
      <Slate editor={editor} value={editorValue} onChange={handleChange}>
        <Editable onKeyDown={handleKeydown} onBlur={handleBlur} onFocus={handleFocus} />
      </Slate>
    </Paper>
  );
};
