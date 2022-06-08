import { setIsModalNewBoard } from '../../store/reducers/boardSlice';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Title, Submit } from '../../Pages/PageSignup/styles';
import { Overlay, ModalWin } from './styles';
import { IFetchBoard } from '../../Pages/MainPage/types';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { useAppDispatch } from '../../store/redux/redux';
import { ITitle } from './types';
import { useTranslation } from 'react-i18next';

const CreateNewBoard = ({ titleName, submitFunc }: ITitle) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFetchBoard>();
  const dispatch = useAppDispatch();

  const onClicWin = (e: React.FormEvent) => {
    e.stopPropagation();
  };

  const onClickClose = () => {
    dispatch(setIsModalNewBoard(false));
    dispatch(setIsModalNewColumn(false));
  };

  const compareTitle = () => {
    return titleName === 'board' || titleName === 'доску';
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
        <Title>{t('board.newboard', { titleName: titleName })}</Title>
        <TextField
          InputProps={{
            ...register('title', { required: true }),
          }}
          label={t('board.placeholder1')}
          variant="outlined"
          color="secondary"
          fullWidth
          helperText={t('board.title')}
        />
        {compareTitle() && (
          <TextField
            InputProps={{
              ...register('description', { required: true }),
            }}
            label={t('board.placeholder2')}
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={t('board.description')}
          />
        )}
        <Submit type="submit" variant="outlined" color="secondary">
          {t('board.newboard', { titleName: titleName })}
        </Submit>
      </ModalWin>
    </Overlay>
  );
};

export default CreateNewBoard;
