import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  width: 300px;
  height: calc(100vh - 250px);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(156, 39, 176, 0.5);
`;

export const Title = styled(Typography)`
  padding-top: 10px;
  text-transform: uppercase;
  text-align: left;
  color: rgba(156, 39, 176, 1);
  font-weight: 500;
`;

export const TitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  width: 250px;
  margin: 0 auto;
`;
