import Box from '@mui/material/Box';
import React from 'react';
import { Note } from '../../models';
import { Time } from '../../utils';

export const NoteMetadata = ({ data }: { data: Note }) => {
  return (
    <Box
      sx={{
        fontSize: '12px',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'start',
        padding: '16px 12px',
        letterSpacing: '-0.4px',
      }}
    >
      @{Time.distanceToNow(data.createdAt)} #{data.uid.substring(data.uid.length - 6)} #parentCount:{data.parentCount}
    </Box>
  );
};
