import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const EditorToolbar = () => {
  // TODO(feat): implement editor toolbar
  const noop = () => {};

  return (
    <>
      <ButtonGroup variant="contained" size="small" aria-label="outlined button group">
        <Button onClick={noop}>#</Button>
        <Button onClick={noop}>@</Button>
        <Button onClick={noop}>/</Button>
      </ButtonGroup>
    </>
  );
};
