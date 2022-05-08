import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { styled } from '@mui/material/styles';

const AppBox = styled(App)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppBox />
    </BrowserRouter>
  </React.StrictMode>
);
