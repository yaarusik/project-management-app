import { Box, Typography, Stack } from '@mui/material';
import styled from 'styled-components';

export const BarWrapper = styled(Stack)`
  padding: 20px 10px;
  position: absolute;
  gap: 20px;
  color: #fff;
  z-index: 100;
  right: 0;
  top: 60px;
  min-height: calc(100vh - 102px);
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  // transform: translate(100%);
  // transition
`;

export const BarTitle = styled(Typography)`
  padding-left: 5px;
  cursor: pointer;
`;

export const BarDescription = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 15px;
  width: 70%;
  height: 100px;
`;
