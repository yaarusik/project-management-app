import { Typography, Stack } from '@mui/material';
import styled from 'styled-components';

type BarActive = {
  toggle: string;
};

export const BarWrapper = styled(Stack)`
  padding: 20px 10px;
  position: absolute;
  gap: 20px;
  color: #fff;
  z-index: 100;
  right: 0;
  top: 60px;
  height: calc(100% - 102px);
  width: 400px;
  background-color: #fff;
  color: rgba(2, 129, 237, 0.7);
  box-shadow: 0 0 10px rgba(156, 39, 176, 0.5);
  border: 1px solid rgba(156, 39, 176, 0.5);
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  transition: all 0.2s ease;
  ${({ toggle }: BarActive) => {
    if (toggle === 'false') {
      return `transform: translate(100%);`;
    } else {
      return `transform: translate(0%);`;
    }
  }}
`;

export const BarTitle = styled(Typography)`
  padding-left: 5px;
  cursor: pointer;
  word-break: break-all;
`;

export const BarDescription = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid rgba(156, 39, 176, 0.5);
  border-radius: 15px;
  width: 360px;
  padding: 10px;
  padding-left: 20px;
  word-break: break-all;
`;
