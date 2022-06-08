import styled from 'styled-components';

export const ModalBody = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border: 2px solid rgba(2, 129, 237, 1);
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
`;

export const DescriptionArea = styled.textarea`
  padding: 10px;
  width: 400px;
  max-width: 100%;
  max-height: 200px;
  min-width: 50%;
  min-height: 40px;
`;
