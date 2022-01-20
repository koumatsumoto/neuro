import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useAppService } from '../../services';

export const EditorToolbar = () => {
  const service = useAppService();

  return (
    <>
      <ButtonGroup variant="contained" size="small" aria-label="outlined button group">
        <Button onClick={() => service.addHash()}>#</Button>
        <Button onClick={() => service.addAt()}>@</Button>
        <Button onClick={() => service.addSlash()}>/</Button>
      </ButtonGroup>
    </>
  );
};
