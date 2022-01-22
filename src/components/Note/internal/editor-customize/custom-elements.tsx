import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

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

export type CustomProps = { type?: string; bold?: boolean };
export type CustomElements = { type: 'paragraph'; children: typeof SimpleTextElement[] } | { type: 'code'; children: typeof CodeBlockElement[] };
