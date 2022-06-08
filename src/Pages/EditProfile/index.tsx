import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../store/redux/redux';
import Cookies from 'js-cookie';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

import { EditProfileTitle } from './styles';
import { FormBlock, FormWrapper, Title, InputField, Submit } from '../PageSignup/styles';

import { IEditUserData } from '../../store/initialState';
import { deleteUserProfile, updateProfile } from '../../utils/api/editUser';

import { ErrorMessage } from './styles';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { useTranslation } from 'react-i18next';

export const EditProfile = () => {
  const { t } = useTranslation();
  const { userId } = useAppSelector((state) => state.authSlice.userData);

  const token = Cookies.get('user');

  const [isOpen, setOpen] = useState(false);
  const changeOnOpen = () => {
    setOpen(true);
  };

  const changeOnClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar(t('profile.change'), { variant });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IEditUserData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IEditUserData> = (data) => {
    updateProfile({ userID: userId, token, userData: data });
    reset();
  };

  const handleDeleteProfile = () => {
    deleteUserProfile({ userID: userId, token });
  };

  return (
    <FormWrapper marginBottom={4}>
      <EditProfileTitle>
        <EditIcon fontSize="large" /> Edit Profile
      </EditProfileTitle>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FaceIcon /> {t('login.name')}
        </Title>
        <InputField
          {...register('name', {
            required: t('validation.name.required'),
            minLength: { value: 2, message: t('validation.name.min') },
            maxLength: { value: 15, message: t('validation.name.max') },
            pattern: {
              value: /^([а-яё\s]+|[a-z\s]+)$/gim,
              message: t('validation.name.message'),
            },
          })}
          type="text"
          placeholder={t('login.name')}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <Title>
          <AccountCircleIcon /> {t('login.login')}
        </Title>
        <InputField
          {...register('login', {
            required: t('validation.login.required'),
            minLength: { value: 3, message: t('validation.login.min') },
            maxLength: { value: 15, message: t('validation.login.max') },
            pattern: {
              value: /^[a-z][a-z0-9]*$/i,
              message: t('validation.login.message'),
            },
          })}
          type="text"
          placeholder={t('login.login')}
        />
        {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}
        <Title>
          <PasswordIcon /> {t('login.password')}
        </Title>
        <InputField
          {...register('password', {
            required: t('validation.password.required'),
            minLength: { value: 8, message: t('validation.password.min') },
            maxLength: { value: 15, message: t('validation.password.max') },
          })}
          type="password"
          placeholder={t('login.password')}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <Submit
          type="submit"
          onClick={handleClickVariant('success')}
          color="success"
          variant="contained"
          disabled={!isValid}
        >
          {t('login.submit')}
        </Submit>

        <Stack mt={2}>
          <Button
            onClick={changeOnOpen}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ bgcolor: red[500], '&:hover': { bgcolor: red[800] } }}
          >
            {t('profile.delete')}
          </Button>
        </Stack>
      </FormBlock>
      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={handleDeleteProfile}
        body={t('confirm.profile.body')}
        title={t('confirm.profile.title')}
      />
    </FormWrapper>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <EditProfile />
    </SnackbarProvider>
  );
}
