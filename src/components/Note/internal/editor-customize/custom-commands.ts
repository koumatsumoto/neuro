import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomCommands = {
  customCommands: {
    addHash(): void;
    addAt(): void;
    addSlash(): void;
  };
};

export const withCustomCommands = <E extends Editor>(editor: E): E & CustomCommands => {
  const customCommands = {
    addHash: () => {
      Transforms.insertText(editor, '#');
      ReactEditor.focus(editor);
    },
    addAt: () => {
      Transforms.insertText(editor, '@');
      ReactEditor.focus(editor);
    },
    addSlash: () => {
      Transforms.insertText(editor, '/');
      ReactEditor.focus(editor);
    },
  };

  return Object.assign(editor, { customCommands });
};
