import styled from 'styled-components';
import { FormBlock } from '../../Pages/PageSignup/styles';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWin = styled(FormBlock)`
  position: fixed;
  z-index: 10;
  top: 20%;
  left: 35%;
  width: 30%;
  min-height: 270px;
  padding: 30px;
  background-color: #fdfdfd;
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 4px;
  color: #000000;
`;
