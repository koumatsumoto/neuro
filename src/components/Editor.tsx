import { useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

export const NeuroEditor = () => {
  const [editor] = useState(withReact(createEditor() as ReactEditor));
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ] as any as Descendant[]);

  // Render the Slate context.
  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      <Editable
        onKeyDown={(event) => {
          console.log(event);
        }}
      />
    </Slate>
  );
};
