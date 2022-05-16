import { setIsModalNewBoard } from '../../store/reducers/boardSlice';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Title, Submit } from '../../Pages/PageSignup/indexStyles';
import { Overlay, ModalWin } from './styles';
import { IFetchBoard } from '../../Pages/MainPage/indexTypes';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { useAppDispatch } from '../../store/redux/redux';
import { ITitle } from './types';

const CreateNewBoard = ({ titleName, submitFunc }: ITitle) => {
  const { register, handleSubmit } = useForm<IFetchBoard>();
  const dispatch = useAppDispatch();

  const onClicWin = (e: React.FormEvent) => {
    e.stopPropagation();
  };

  const onClickClose = () => {
    dispatch(setIsModalNewBoard(false));
    dispatch(setIsModalNewColumn(false));
  };

  return (
    <Overlay>
      <ModalWin onClick={onClicWin} onSubmit={handleSubmit(submitFunc)}>
        <IconButton
          onClick={onClickClose}
          sx={{ position: 'absolute', left: '88%', bottom: '85%' }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Title>Create new {titleName}</Title>
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
          Create new {titleName}
        </Submit>
      </ModalWin>
    </Overlay>
  );
};

export default CreateNewBoard;
