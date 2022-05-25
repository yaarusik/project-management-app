import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';

import EditIcon from '@mui/icons-material/Edit';

import { EditProfileTitle } from './styles';
import { FormBlock, FormWrapper, Title, InputField, Submit } from '../PageSignup/styles';

const EditProfile = () => {
  return (
    <FormWrapper>
      <EditProfileTitle>
        <EditIcon fontSize="large" /> Edit Profile
      </EditProfileTitle>

      <FormBlock>
        <Title>
          <FaceIcon /> Name
        </Title>
        <InputField />
        <Title>
          <AccountCircleIcon /> Login
        </Title>
        <InputField />
        <Title>
          <PasswordIcon /> Password
        </Title>
        <InputField />
        <Submit type="submit" color="success" variant="contained">
          Submit
        </Submit>
      </FormBlock>
    </FormWrapper>
  );
};

export default EditProfile;
