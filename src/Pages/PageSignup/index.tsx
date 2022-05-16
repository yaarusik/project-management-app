import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { IconButton, InputAdornment, Link } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { ISubmit } from './types';

import { FormBlock, InputField, Submit, Title, Helper, FormWrapper } from './styles';
import { schema } from './validation';

import { registration } from './../../utils/api/api';
import { useAppDispatch } from './../../Components/BoardCard/index';

const PageSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmit>({
    resolver: yupResolver(schema),
  });

  const { name, login, password } = errors;

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISubmit> = async (data) => {
    // console.log('submit data >', JSON.stringify(data));
    try {
      const { meta } = await dispatch(registration(data));

      if (meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    } catch (e) {
      console.log('error >', e);
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
