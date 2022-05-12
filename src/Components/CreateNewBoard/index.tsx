import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setIsCreateNewBoard } from '../../store/rootSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Title, Submit } from '../../Pages/PageSignup/indexStyles';
import { Overlay, ModalWin } from './indexStyles';
import { addNewBoard } from '../Api';
import { IFetchBoard } from '../../types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const CreateNewBoard = () => {
  const { register, handleSubmit, reset } = useForm<IFetchBoard>();
  const dispatch = useAppDispatch();

  const onClicWin = (e: React.FormEvent) => {
    e.stopPropagation();
  };

  const onClickClose = () => {
    dispatch(setIsCreateNewBoard(false));
  };

  const createBoard = (data: IFetchBoard) => {
    dispatch(addNewBoard(data.title));
    dispatch(setIsCreateNewBoard(false));
  };

  return (
    <Overlay>
      <ModalWin onClick={onClicWin} onSubmit={handleSubmit(createBoard)}>
        <IconButton
          onClick={onClickClose}
          sx={{ position: 'absolute', left: '88%', bottom: '85%' }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Title>Create new board</Title>
        <TextField
          InputProps={{
            ...register('title'),
          }}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          helperText="Please enter your title board"
        />
        <Submit type="submit" variant="outlined" color="secondary">
          Create new board
        </Submit>
      </ModalWin>
    </Overlay>
  );
};

export default CreateNewBoard;
