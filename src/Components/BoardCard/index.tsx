import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IBoardCard } from '../../types';
import Button from '@mui/material/Button';

function BoardCard({ imgSrc, title, description }: IBoardCard) {
  return (
    <Card
      sx={{
        minWidth: 610,
        height: 140,
        padding: '10px',
        margin: '10px',
        border: '2px solid rgba(2,129,237,0.2)',
      }}
    >
      <CardActionArea
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '20px' }}
      >
        <CardMedia sx={{ width: 70 }} component="img" height="70" image={imgSrc} alt="board img" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant="text" sx={{ left: '470px', color: 'rgba(255, 0, 0, 0.5)' }}>
        Delete board
      </Button>
    </Card>
  );
}

export default BoardCard;
