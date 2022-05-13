import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormBlock, FormWrapper, InputField, Submit, Title } from '../PageSignup/indexStyles';

import { IAuthorization } from './indexTypes';

import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { authorization } from '../../utils/api/api';
import { useAppDispatch } from '../../store/redux/redux';

const PageLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthorization>({
    reValidateMode: 'onSubmit',
  });

  const { login, password } = errors;

  const onSubmit: SubmitHandler<IAuthorization> = async (data) => {
    console.log('submit data >', JSON.stringify(data));
    try {
      await dispatch(authorization(data));
      reset();
    } catch (e) {
      console.log('error >', e);
    } finally {
      // preloader stop
    }
  };

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>Authorization</Title>

        <InputField
          InputProps={{
            ...register('login'),
          }}
          error={!!login}
          label="Login"
          helperText={!!login ? login.message : 'Please enter your login'}
        />

        <InputField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={hundlerShowPassword}>
                  {showPassword ? <VisibilityOffSharpIcon /> : <VisibilitySharpIcon />}
                </IconButton>
              </InputAdornment>
            ),
            type: showPassword ? 'text' : 'password',
            ...register('password'),
          }}
          error={!!password}
          label="Password"
          helperText={!!password ? password.message : 'Please enter your password'}
        />

        <Submit type="submit" color="success" variant="contained">
          Submit
        </Submit>
      </FormBlock>
    </FormWrapper>
  );
};

export default PageLogin;
