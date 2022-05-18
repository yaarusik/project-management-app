import { Box, IconButton } from '@mui/material';
import { ColumnWrapper, Title, TitleWrapper } from './styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from '../../store/initialState';

export const Column = ({ title }: IColumn) => {
  return (
    <ColumnWrapper>
      <Box>
        <TitleWrapper>
          <Title>{title}</Title>
          <Box>
            <IconButton aria-label="add">
              <AddIcon color="secondary" />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon color="secondary" />
            </IconButton>
          </Box>
        </TitleWrapper>
      </Box>
    </ColumnWrapper>
  );
};
