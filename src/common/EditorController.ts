import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export class EditorController {
  readonly #editor: ReactEditor;

  constructor(editor: ReactEditor) {
    this.#editor = editor;
  }

  addHash() {
    Transforms.insertText(this.#editor, '#');
    ReactEditor.focus(this.#editor);
  }

  addAt() {
    Transforms.insertText(this.#editor, '@');
    ReactEditor.focus(this.#editor);
  }

  addSlash() {
    Transforms.insertText(this.#editor, '/');
    ReactEditor.focus(this.#editor);
  }
}
