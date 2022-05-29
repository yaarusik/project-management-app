import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { FormBlock, FormWrapper, Helper, InputField, Submit, Title } from '../PageSignup/styles';

import { IAuthorization } from './types';

import { IconButton, InputAdornment, Link } from '@mui/material';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { authorization } from '../../utils/api/auth';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';

import Cookies from 'js-cookie';
import { authSlice } from './../../store/reducers/authSlice';
import SimpleSnackbar from './../../Components/Snackbar';
import Preloader from '../../Components/Preloader';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from './validation';

const PageLogin = () => {
  const { t, i18n } = useTranslation();
  const schema = useMemo(() => authSchema(), [i18n.language]);

  const dispatch = useAppDispatch();
  const { setToken, setUserData } = authSlice.actions;
  const { isPendingAuth, isAuth, isCorrectData, token } = useAppSelector(
    (state) => state.authSlice
  );

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthorization>({
    resolver: yupResolver(schema),
  });

  const { login, password } = errors;

  const onSubmit: SubmitHandler<IAuthorization> = async (data) => {
    const { meta, payload } = await dispatch(authorization(data));

    if (meta.requestStatus === 'fulfilled') {
      const { token } = payload;
      Cookies.set('user', token);
      dispatch(setToken(token));

      const parseToken = jwtDecode(token);
      dispatch(setUserData(parseToken));

      navigate('/mainPage');
    }
  };

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      navigate('/main');
    }
  }, []);

  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        {isPendingAuth && !isAuth ? (
          <Preloader />
        ) : (
          <>
            <Title>{t('header.login')}</Title>

            <InputField
              InputProps={{
                ...register('login'),
              }}
              error={!!login}
              label={t('login.login')}
              helperText={!!login ? login.message : t('login.describe1')}
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
              label={t('login.password')}
              helperText={!!password ? password.message : t('login.describe2')}
            />

            <Submit type="submit" color="success" variant="contained">
              {t('login.submit')}
            </Submit>
            <Helper>
              {t('login.helper')}
              <Link component={RouterLink} to="/signup" color="inherit">
                {t('login.signup')}
              </Link>
            </Helper>
            {!isCorrectData && (
              <SimpleSnackbar errorMessage={'Проверьте корректность логина или пароля'} />
            )}
          </>
        )}
      </FormBlock>
    </FormWrapper>
  );
};

export default PageLogin;
