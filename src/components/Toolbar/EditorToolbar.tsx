import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useAppUseCases } from '../../models';

export const EditorToolbar = () => {
  const usecases = useAppUseCases();

  return (
    <>
      <ButtonGroup variant="contained" size="small" aria-label="outlined button group">
        <Button onClick={() => usecases.addHash()}>#</Button>
        <Button onClick={() => usecases.addAt()}>@</Button>
        <Button onClick={() => usecases.addSlash()}>/</Button>
      </ButtonGroup>
    </>
  );
};
