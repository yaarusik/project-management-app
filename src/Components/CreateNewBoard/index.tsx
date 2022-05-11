import { useDispatch } from 'react-redux';
import { setIsCreateNewBoard } from '../../store/rootSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Title } from '../../Pages/PageSignup/indexStyles';
import { Overlay, ModalWin } from './indexStyles';

const CreateNewBoard = () => {
  const dispatch = useDispatch();

  const onClicWin = (e: React.FormEvent) => {
    e.stopPropagation();
  };

  const onClickClose = () => {
    dispatch(setIsCreateNewBoard(false));
  };

  return (
    <Overlay>
      <ModalWin onClick={onClicWin}>
        <IconButton sx={{ position: 'absolute', left: '88%', bottom: '88%' }} aria-label="close">
          <CloseIcon onClick={onClickClose} />
        </IconButton>
        <Title>Create new board</Title>
        <TextField
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          helperText="Please enter your title board"
        />
        <TextField
          label="Description"
          variant="outlined"
          color="secondary"
          fullWidth
          helperText="Please enter your description"
        />
        <Button variant="outlined" color="secondary">
          Create new board
        </Button>
      </ModalWin>
    </Overlay>
  );
};

export default CreateNewBoard;
