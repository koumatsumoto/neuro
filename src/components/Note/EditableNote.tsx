import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProseMirror, useProseMirror } from 'use-prosemirror';
import { Note } from '../../models';
import { noop } from '../../utils';
import { NoteMetadata } from './Metadata';

import 'prosemirror-view/style/prosemirror.css';

const myKeymap = keymap({
  ...baseKeymap,
  'Mod-Space': (state, dispatch) => {
    console.log('myKeymap', state);
    return true;
  },
});

export const EditableNote = ({ data, onChange = noop }: { data: Note; onChange?: (data: { text: string }) => void }) => {
  const [state, setState] = useProseMirror({ schema, doc: defaultMarkdownParser.parse(data.text), plugins: [myKeymap] });
  const viewRef = useRef<{ view: EditorView | null }>(null);
  const [changeNotificator] = useState(new Subject<{ text: string }>());

  useEffect(() => {
    const subscription = changeNotificator.pipe(debounceTime(1000)).subscribe(onChange);

    return () => subscription.unsubscribe();
  }, [changeNotificator, onChange]);

  const handleChange = useCallback(
    (data: EditorState) => {
      // console.log('[debug/onChange/state]', data);
      // console.log('[debug/onChange/view]', viewRef.current?.view);
      setState(data);

      changeNotificator.next({ text: defaultMarkdownSerializer.serialize(data.doc) });
    },
    [setState, changeNotificator, viewRef],
  );

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
        <ProseMirror ref={viewRef} state={state} onChange={handleChange} />
      </Box>
    </Paper>
  );
};
