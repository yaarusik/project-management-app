import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const ModalWrapper = styled(Box)`
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400px,
  background-color: '#fff',
  border: '2px solid #000',
  padding: 4px,
`;
