import type { BaseEditor, BaseElement, BaseText } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { CustomCommands } from './custom-commands';
import type { CustomElements, CustomProps } from './custom-elements';

export * from './custom-commands';
export * from './custom-elements';

// @see https://docs.slatejs.org/concepts/12-typescript
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & CustomCommands & CustomProps;
    Element: (BaseElement & CustomProps) | CustomElements;
    Text: BaseText & CustomProps;
  }
}
