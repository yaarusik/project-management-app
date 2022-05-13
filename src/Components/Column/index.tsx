import { Box, IconButton } from '@mui/material';
import { ColumnWrapper, Title, TitleWrapper } from './indexStyles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const Column = () => {
  return (
    <ColumnWrapper>
      <Box>
        <TitleWrapper>
          <Title>Column Name</Title>
          <Box>
            <IconButton aria-label="delete">
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
