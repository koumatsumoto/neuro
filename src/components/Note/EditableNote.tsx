import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';
import { ProseMirror, useProseMirror } from 'use-prosemirror';
import { Note } from '../../models';
import { NoteMetadata } from './Metadata';

import 'prosemirror-view/style/prosemirror.css';

const myKeymap = keymap({
  ...baseKeymap,
  'Mod-Space': (state, dispatch) => {
    console.log('myKeymap', state);
    return true;
  },
});

export const EditableNote = ({ data, onBlur }: { data: Note; onBlur?: (data: { text: string }) => void }) => {
  const [state, setState] = useProseMirror({
    schema,
    doc: defaultMarkdownParser.parse(data.text),
    plugins: [myKeymap],
  });

  const handleChange = useCallback(
    (data: EditorState) => {
      console.log('[debug/onChange/state]', data);
      setState(data);
    },
    [setState],
  );

  const handleBlur = (view: EditorView) => {
    onBlur?.({ text: defaultMarkdownSerializer.serialize(view.state.doc) });
    return true;
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: '600px',
        maxWidth: '100%',
      }}
    >
      <NoteMetadata data={data} />
      <Divider />
      <Box
        sx={{
          padding: '12px 16px',
          '& *': {
            fontSize: '12px',
            lineHeight: '10.4px',
            letterSpacing: '-0.14px',
          },
        }}
      >
        <ProseMirror
          state={state}
          onChange={handleChange}
          handleDOMEvents={{
            blur: handleBlur,
          }}
        />
      </Box>
    </Paper>
  );
};
