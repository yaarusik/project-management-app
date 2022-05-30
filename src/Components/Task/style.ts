import { Box, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

export const TasksWrapper = styled(Box)`
  height: 350px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 0px 10px;
  color: rgba(2, 129, 237, 0.8);
  overflow-y: auto;
`;

export const TaskBody = styled(Stack)`
  border: 1px solid rgba(2, 129, 237, 0.3);
  box-shadow: 0px 0px 7px rgba(2, 129, 237, 0.2);
  border-radius: 15px;
  padding: 0px 5px 5px;
  cursor: move;
`;

export const TaskTitle = styled(Typography)`
  padding-left: 5px;
  cursor: pointer;
`;

export const TaskAuthor = styled(Typography)`
  padding-left: 5px;
`;

export const TaskHeader = styled(Stack)`
  width: 100%;
`;
