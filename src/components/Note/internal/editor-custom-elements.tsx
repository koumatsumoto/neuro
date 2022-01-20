import React from 'react';
import { BaseEditor, BaseElement, BaseText } from 'slate';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

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

export const Leaf = (props: RenderLeafProps) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  );
};

// @see https://docs.slatejs.org/concepts/12-typescript
type CustomProps = { type?: string; bold?: boolean };
declare module 'slate' {
  interface CustomTypes {
    Editor: (BaseEditor & CustomProps) & ReactEditor;
    Element: (BaseElement & CustomProps) | { type: 'simple-text'; children: typeof SimpleTextElement[] } | { type: 'code'; children: typeof CodeBlockElement[] };
    Text: BaseText & CustomProps;
  }
}
