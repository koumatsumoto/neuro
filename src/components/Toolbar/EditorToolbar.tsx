import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEditorController } from '../../common';

export const EditorToolbar = () => {
  const editorController = useEditorController();

  return (
    <>
      <ButtonGroup variant="contained" size="small" aria-label="outlined button group">
        <Button onClick={() => editorController?.addHash()}>#</Button>
        <Button onClick={() => editorController?.addAt()}>@</Button>
        <Button onClick={() => editorController?.addSlash()}>/</Button>
      </ButtonGroup>
    </>
  );
};
