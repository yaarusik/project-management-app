import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IBoardCard } from './types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { deleteBoard, getBoards } from '../../utils/api/boards';
import { setSelectedBoardTitle, setSelectedBoardId } from '../../store/reducers/boardSlice';
import ConfirmationModal from '../ConfirmationModal';
import { useTranslation } from 'react-i18next';
import { DeleteButton } from './styles';

const BoardCard = ({ imgSrc, title, id, description }: IBoardCard) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authSlice);

  const [isOpen, setOpen] = useState(false);

  const changeOnOpen = () => setOpen(true);

  const changeOnClose = () => setOpen(false);

  const onClickDelete = async () => {
    if (token) {
      await dispatch(deleteBoard({ id, token }));
      dispatch(getBoards(token));
    }
  };

  const onClickSelect = async () => {
    dispatch(setSelectedBoardTitle(title));
    await dispatch(setSelectedBoardId(id));
    localStorage.setItem('boardId', JSON.stringify(id));
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 510,
          height: 120,
          padding: '10px',
          margin: '15px 20px',
          border: '2px solid rgba(2,129,237,0.2)',
        }}
      >
        <CardActionArea
          onClick={onClickSelect}
          component={Link}
          to="/board"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '20px' }}
        >
          <CardMedia
            sx={{ width: 70 }}
            component="img"
            height="70"
            image={imgSrc}
            alt="board img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ fontSize: '1rem', color: 'grey' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <DeleteButton onClick={changeOnOpen} variant="text">
          {t('main.deleteboard')}
        </DeleteButton>
        <CardActionArea
          onClick={onClickSelect}
          component={Link}
          to="/board"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '20px' }}
        >
          <CardMedia
            sx={{ width: 70 }}
            component="img"
            height="70"
            image={imgSrc}
            alt="board img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={onClickDelete}
        body={t('confirm.board.body')}
        title={t('confirm.board.title')}
      />
    </>
  );
};

export default BoardCard;
