import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const EditorToolbar = () => {
  return (
    <>
      <ButtonGroup variant="contained" size="small" aria-label="outlined button group">
        <Button>#</Button>
        <Button>@</Button>
        <Button>/</Button>
      </ButtonGroup>
    </>
  );
};
