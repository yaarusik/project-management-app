import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IBoardCard } from '../../types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function BoardCard({ imgSrc, title }: IBoardCard) {
  return (
    <Card
      sx={{
        minWidth: 510,
        height: 120,
        padding: '10px',
        margin: '10px',
        border: '2px solid rgba(2,129,237,0.2)',
      }}
    >
      <CardActionArea
        component={Link}
        to="*"
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '20px' }}
      >
        <CardMedia sx={{ width: 70 }} component="img" height="70" image={imgSrc} alt="board img" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant="text" sx={{ left: '370px', color: 'rgba(255, 0, 0, 0.5)' }}>
        Delete board
      </Button>
    </Card>
  );
}

export default BoardCard;
