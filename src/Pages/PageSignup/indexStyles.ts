import { Box, Button, TextField, Stack } from '@mui/material';
import styled from 'styled-components';

export const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  text-align: center;
  padding: 30px;
  border: 2px solid rgba(2, 129, 237, 0.5);
  box-shadow: 2px 3px 3px rgba(2, 129, 237, 0.2);
  color: rgba(2, 129, 237, 1);
  border-radius: 24px;
  font-size: 1.8rem;
`;

export const Title = styled(Box)`
  font-weight: 700;
  color: #2e7d32;
`;

export const InputField = styled(TextField)`
  width: 330px;
`;

export const Submit = styled(Button)`
  width: 330px;
  font-size: 1.2rem;
`;

export const Helper = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
`;

export const FormWrapper = styled(Stack)`
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
`;
