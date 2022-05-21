import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IBoardCard } from './types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/redux/redux';
import { deleteBoard, getBoards } from '../../utils/api/boards';
import { setSelectedBoardTitle, setSelectedBoardId } from '../../store/reducers/boardSlice';
import Cookies from 'js-cookie';

const BoardCard = ({ imgSrc, title, id, description }: IBoardCard) => {
  const dispatch = useAppDispatch();

  const token = Cookies.get('user');

  const onClickDelete = async () => {
    if (token) {
      await dispatch(deleteBoard({ id, token }));
      dispatch(getBoards(token));
    }
  };

  const onClickSelect = async () => {
    dispatch(setSelectedBoardTitle(title));
    await dispatch(setSelectedBoardId(id));
    window.localStorage.setItem('boardId', JSON.stringify(id));
  };

  return (
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
        <CardMedia sx={{ width: 70 }} component="img" height="70" image={imgSrc} alt="board img" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontSize: '1rem', color: 'grey' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={onClickDelete}
        variant="text"
        sx={{ top: '-30px', left: '370px', color: 'rgba(255, 0, 0, 0.5)' }}
      >
        Delete board
      </Button>
    </Card>
  );
};

export default BoardCard;
