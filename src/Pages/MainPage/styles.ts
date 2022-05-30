import styled from 'styled-components';

import { Container, Typography } from '@mui/material';

export const BoardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainTitle = styled(Typography)`
  text-transform: uppercase;
  text-align: center;
  color: rgba(2, 129, 237, 0.5);
  font-weight: 500;
`;

export const MainBody = styled.div`
  width: 100%;
  padding: 20px;
`;

export const MainWrapper = styled(Container)`
  max-width: xl;
  min-height: calc(100vh - 102px);
`;
