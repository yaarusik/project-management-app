import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  min-width: 300px;
  height: calc(100vh - 250px);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(156, 39, 176, 0.5);
  transition: border 0.2s;
  overflow-y: auto;
  &:hover {
    box-shadow: 0 0 10px #1164b4;
  }
`;

export const Title = styled(Typography)`
  padding: 10px 0 0 10px;
  text-transform: uppercase;
  text-align: left;
  color: rgba(156, 39, 176, 1);
  font-weight: 500;
`;

export const TitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
  width: 250px;
  margin: 0 auto;
`;
