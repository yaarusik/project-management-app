import { Typography, Box, Container, Button } from '@mui/material';
import styled from 'styled-components';

export const BoardWrapper = styled(Container)`
  max-width: xl;
  min-height: calc(100vh - 102px);
`;

export const TitleBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

export const ColumnWrapper = styled(TitleBox)`
  justify-content: space-around;
`;

export const Title = styled(Typography)`
  text-transform: uppercase;
  text-align: left;
  color: rgba(2, 129, 237, 0.9);
  font-weight: 500;
`;
