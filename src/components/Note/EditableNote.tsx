import Paper from '@mui/material/Paper';
import React, { useCallback, useRef, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';
import { Note } from '../../models';
import { useSetEditorController } from '../../services';
import { EditorController } from '../../services/EditorController';
import { noop } from '../../utils';
import { CodeBlockElement, disableBrowserShortcuts, disableTabKey, EditorOutputData, getInitialEditorValue, makeEditorOutputData, SimpleTextElement } from './internal';

export const EditableNote = ({
  data,
  onFocus = noop,
  onBlur = noop,
  onChange = noop,
}: {
  data: Note;
  onFocus?: () => void;
  onBlur?: (data: EditorOutputData) => void;
  onChange?: (data: EditorOutputData) => void;
}) => {
  const editor = useRef(withReact(createEditor() as ReactEditor)).current;
  const [editorValue, setEditorValue] = useState<Descendant[]>(getInitialEditorValue(data));
  const setEditorController = useSetEditorController();

  const handleChange = (value: Descendant[]) => {
    setEditorValue(value);
    onChange(makeEditorOutputData(value));
  };

  const handleKeydown = useCallback(
    (ev: React.KeyboardEvent) => {
      disableTabKey(ev);
      disableBrowserShortcuts(ev);

      if (ev.key === '`' && ev.ctrlKey) {
        ev.preventDefault();

        // Determine whether any of the currently selected blocks are code blocks.
        const [match] = Editor.nodes(editor, {
          match: (n) => n.type === 'code',
        });
        // Toggle the block type depending on whether there's already a match.
        Transforms.setNodes(editor, { type: match ? 'simple-text' : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
      }
    },
    [editor],
  );

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      // for EditorToolbar buttons operations
      if (!ReactEditor.isFocused(editor)) {
        onBlur(makeEditorOutputData(editor.children));
      }
    }, 160);
  }, [editor, onBlur]);

  const handleFocus = useCallback(() => {
    setEditorController(new EditorController(editor));
    onFocus();
  }, [setEditorController, editor, onFocus]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeBlockElement {...props} />;
      default:
        return <SimpleTextElement {...props} />;
    }
  }, []);

  return (
    <Paper
      elevation={1}
      sx={{
        width: '600px',
        maxWidth: '100%',
        padding: '18px 16px 24px',
        '& *': {
          fontSize: '12px',
        },
      }}
    >
      <Slate editor={editor} value={editorValue} onChange={handleChange}>
        <Editable renderElement={renderElement} onKeyDown={handleKeydown} onBlur={handleBlur} onFocus={handleFocus} />
      </Slate>
    </Paper>
  );
};
