import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import Cookies from 'js-cookie';

import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import { EditProfileTitle } from './styles';
import { FormBlock, FormWrapper, Title, InputField, Submit } from '../PageSignup/styles';

import { IEditUserData } from '../../store/initialState';
import { updateProfile } from '../../utils/api/editUser';

import { ErrorMessage } from './styles';
import { authSlice } from '../../store/reducers/authSlice';

export const EditProfile = () => {
  const { userId } = useAppSelector((state) => state.authSlice.userData);
  const dispatch = useAppDispatch();
  const { setUserData } = authSlice.actions;

  const token = Cookies.get('user');

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar('Your profile has been successfully changed', { variant });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
  } = useForm<IEditUserData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IEditUserData> = (data) => {
    updateProfile({ userID: userId, token, userData: data });
    dispatch(setUserData(data));
    reset();
  };

  return (
    <FormWrapper>
      <EditProfileTitle>
        <EditIcon fontSize="large" /> Edit Profile
      </EditProfileTitle>
      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FaceIcon /> Name
        </Title>
        <InputField
          {...register('name', {
            required: 'Введите корректное имя',
            minLength: { value: 2, message: 'Минимальная длина имени 2 буквы' },
            maxLength: { value: 15, message: 'Максимальная длина имени 15 букв' },
            pattern: {
              value: /^([а-яё\s]+|[a-z\s]+)$/gim,
              message: 'Имя может содержать только русские или английские буквы, без цифр',
            },
          })}
          type="text"
          placeholder="name"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <Title>
          <AccountCircleIcon /> Login
        </Title>
        <InputField
          {...register('login', {
            required: 'Введите логин',
            minLength: { value: 3, message: 'Минимальная длина имени 3 буквы' },
            maxLength: { value: 15, message: 'Максимальная длина имени 15 букв' },
            pattern: {
              value: /^[a-z][a-z0-9]*$/i,
              message: 'Логин содержит только английские буквы и цифры',
            },
          })}
          type="text"
          placeholder="login"
        />
        {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}
        <Title>
          <PasswordIcon /> Password
        </Title>
        <InputField
          {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 8, message: 'Пароль должен быть больше чем 8 символов' },
            maxLength: { value: 15, message: 'Максимальная длина пароль 15 символов' },
          })}
          type="password"
          placeholder="password"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <Submit
          type="submit"
          onClick={handleClickVariant('success')}
          color="success"
          variant="contained"
          disabled={!isValid}
        >
          Submit
        </Submit>
      </FormBlock>
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
