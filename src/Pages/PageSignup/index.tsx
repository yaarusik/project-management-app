import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IconButton, InputAdornment, Link } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { ISubmit } from './indexTypes';

import { FormBlock, InputField, Submit, Title, Helper, FormWrapper } from './indexStyles';

const PageSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<ISubmit>();

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISubmit> = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>РЕГИСТРАЦИЯ</Title>

        <InputField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleSharpIcon />
              </InputAdornment>
            ),
            ...register('name'),
          }}
          label="Name"
          helperText="Please enter your name"
        />

        <InputField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailSharpIcon />
              </InputAdornment>
            ),
            ...register('email'),
          }}
          label="Email"
          helperText="Please enter your email"
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
          label="Password"
          helperText="Please enter your password"
        />

        <Submit type="submit" color="success" variant="contained">
          Submit
        </Submit>

        <Helper>
          Если вы уже зарегистрированы - нажмите{' '}
          <Link component={RouterLink} to="/login" color="inherit">
            сюда
          </Link>
        </Helper>
      </FormBlock>
    </FormWrapper>
  );
};

export default PageSignUp;
