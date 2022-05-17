import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { FormBlock, FormWrapper, Helper, InputField, Submit, Title } from '../PageSignup/styles';

import { IAuthorization } from './types';

import { IconButton, InputAdornment, Link } from '@mui/material';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { authorization } from '../../utils/api/auth';
import { useAppDispatch } from '../../store/redux/redux';

import Cookies from 'js-cookie';
import { authSlice } from './../../store/reducers/authSlice';
import SimpleSnackbar from './../../Components/Snackbar';

const PageLogin = () => {
  const dispatch = useAppDispatch();
  const { setSnackBar } = authSlice.actions;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthorization>({
    reValidateMode: 'onSubmit',
  });

  const { login, password } = errors;

  const onSubmit: SubmitHandler<IAuthorization> = async (data) => {
    console.log('submit data >', JSON.stringify(data));
    try {
      const { meta, payload } = await dispatch(authorization(data));

      if (meta.requestStatus === 'fulfilled') {
        Cookies.set('user', payload.token);
        navigate('/mainPage');
      } else {
        dispatch(setSnackBar(true));
      }
    } catch (e) {
      console.log('error >', e);
    }
  };

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>Log in</Title>

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
          Have no aacount yet?{' '}
          <Link component={RouterLink} to="/signup" color="inherit">
            Sign up
          </Link>
        </Helper>
        <SimpleSnackbar />
      </FormBlock>
    </FormWrapper>
  );
};

export default PageLogin;
