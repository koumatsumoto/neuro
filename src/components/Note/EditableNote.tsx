import Paper from '@mui/material/Paper';
import React, { useCallback, useRef, useState } from 'react';
import { createEditor, Descendant, Editor, Text, Transforms } from 'slate';
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';
import { Note } from '../../models';
import { useAppService } from '../../services';
import { debug, noop, useSubscribe } from '../../utils';
import {
  addAt,
  addHash,
  addSlash,
  CodeBlockElement,
  debugNodes,
  disableControlKeyShortcuts,
  disableTabKey,
  EditorOutputData,
  getInitialEditorValue,
  Leaf,
  makeEditorOutputData,
  onCtrlAnd,
  SimpleTextElement,
} from './internal';

export const EditableNote = ({
  data,
  onFocus = noop,
  onBlur = noop,
  onChange = noop,
}: {
  data: Note;
  onFocus?: (editor: ReactEditor) => void;
  onBlur?: (data: EditorOutputData) => void;
  onChange?: (data: EditorOutputData) => void;
}) => {
  const editor = useRef(withReact(createEditor() as ReactEditor)).current;
  const [editorValue, setEditorValue] = useState<Descendant[]>(getInitialEditorValue(data));

  const service = useAppService();
  useSubscribe(service.getCommandsOf(editor), {
    onNext: (command) => {
      switch (command) {
        case 'AddHash':
          return addHash(editor);
        case 'AddAt':
          return addAt(editor);
        case 'AddSlash':
          return addSlash(editor);
        default:
          return;
      }
    },
  });

  const handleChange = useCallback(
    (value: Descendant[]) => {
      setEditorValue(value);
      onChange(makeEditorOutputData(value));
    },
    [setEditorValue, onChange],
  );

  debugNodes(editor);

  const handleKeydown = useCallback(
    (ev: React.KeyboardEvent) => {
      disableTabKey(ev);
      disableControlKeyShortcuts(ev);
      onCtrlAnd('`', () => {
        // Determine whether any of the currently selected blocks are code blocks.
        const [match] = Editor.nodes(editor, { match: (n) => n.type === 'code' });
        // Toggle the block type depending on whether there's already a match.
        Transforms.setNodes(editor, { type: match ? 'simple-text' : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
      })(ev);
      onCtrlAnd('b', () => {
        const [match] = Editor.nodes(editor, { match: (n) => Text.isText(n) && n.bold === true });
        Transforms.setNodes(
          editor,
          { bold: !match },
          // Apply it to text nodes, and split the text node up if the
          // selection is overlapping only part of it.
          { match: (n) => Text.isText(n), split: true },
        );
      })(ev);
    },
    [editor],
  );

  const handleKeyup = useCallback((ev: React.KeyboardEvent) => {}, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      // for EditorToolbar buttons operations
      if (!ReactEditor.isFocused(editor)) {
        onBlur(makeEditorOutputData(editor.children));
      }
    }, 100);
  }, [editor, onBlur]);

  const handleFocus = useCallback(() => {
    onFocus(editor);
  }, [editor, onFocus]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeBlockElement {...props} />;
      default:
        return <SimpleTextElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    debug('lenderLeaf', () => props);

    return Leaf(props);
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
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={handleKeydown} onKeyUp={handleKeyup} onBlur={handleBlur} onFocus={handleFocus} />
      </Slate>
    </Paper>
  );
};
