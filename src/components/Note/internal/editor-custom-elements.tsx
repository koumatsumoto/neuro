import React from 'react';
import { BaseEditor, BaseElement, BaseText } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';

export const SimpleTextElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const CodeBlockElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes} style={{ backgroundColor: '#424242', color: '#ffffff' }}>
      <code>{props.children}</code>
    </pre>
  );
};

// @see https://docs.slatejs.org/concepts/12-typescript
declare module 'slate' {
  interface CustomTypes {
    Editor: (BaseEditor & { type?: never }) & ReactEditor;
    Element: (BaseElement & { type?: never }) | { type: 'simple-text'; children: typeof SimpleTextElement[] } | { type: 'code'; children: typeof CodeBlockElement[] };
    Text: BaseText & { type?: never };
  }
}
