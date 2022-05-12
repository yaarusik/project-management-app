import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IconButton, InputAdornment, Link } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { ISubmit } from './indexTypes';

import { FormBlock, InputField, Submit, Title, Helper, FormWrapper } from './indexStyles';
import { schema } from './indexValidation';
import { api } from '../../utils/api/api';

const PageSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISubmit>({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const { name, login, password } = errors;

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISubmit> = async (data) => {
    console.log('submit data >', JSON.stringify(data));
    try {
      // preloader start
      const registrationResponse = await api.registration(data);
      if (registrationResponse.status === 409) {
        console.log('Пользователь с таким адресом уже существует');
      } else {
        const { login, password } = data;

        const authorizationResponse = await api.authorization(login, password);

        const loginData = await authorizationResponse.json();

        console.log('loginData >', loginData);

        reset();
      }
    } catch (e) {
      console.log('error >', e);
    } finally {
      // preloader stop
    }
  };

  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>Registration</Title>

        <InputField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleSharpIcon />
              </InputAdornment>
            ),
            ...register('name'),
          }}
          error={!!name}
          label="Name"
          helperText={!!name ? name.message : 'Please enter your name'}
        />

        <InputField
          InputProps={{
            ...register('login'),
          }}
          error={!!login}
          label="Login"
          helperText={!!login ? login.message : 'Please enter your name'}
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

        <Helper>
          If you are already registered - click{' '}
          <Link component={RouterLink} to="/login" color="inherit">
            here
          </Link>
        </Helper>
      </FormBlock>
    </FormWrapper>
  );
};

export default PageSignUp;
