import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { IconButton, InputAdornment, Link } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { ISubmit } from './types';

import { FormBlock, InputField, Submit, Title, Helper, FormWrapper } from './styles';
import { registrationShema } from './validation';

import { registration } from '../../utils/api/auth';

import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import Preloader from '../../Components/Preloader';
import { useTranslation } from 'react-i18next';

import SimpleSnackbar from '../../Components/Snackbar';

const PageSignUp = () => {
  const { t, i18n } = useTranslation();
  const schema = useMemo(() => registrationShema(), [i18n.language]);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isPendingRegistration, isLoginExist } = useAppSelector((state) => state.authSlice);

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
    const { meta } = await dispatch(registration(data));

    if (meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <FormWrapper>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        {isPendingRegistration ? (
          <Preloader />
        ) : (
          <>
            <Title>{t('login.registration')}</Title>

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
              label={t('login.name')}
              helperText={!!name ? name.message : t('login.describe3')}
            />

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
            {!isLoginExist && <SimpleSnackbar errorMessage={'Данный логин уже существует'} />}
            <Helper>
              {t('login.registermessage')}
              <Link component={RouterLink} to="/login" color="inherit">
                {t('login.here')}
              </Link>
            </Helper>
          </>
        )}
      </FormBlock>
    </FormWrapper>
  );
};

export default PageSignUp;
