import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IconButton, InputAdornment, Link } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

import { ISubmit } from './indexTypes';

import { FormBlock, InputField, Submit, Title, Helper, FormWrapper } from './indexStyles';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^([а-яё\s]+|[a-z\s]+)$/gim,
      'Имя может содержать только русские или английские буквы, без цифр'
    )
    .min(2, 'Минимальная длина имени 2 буквы')
    .max(15, 'Максимальная длина имени 15 букв')
    .required('Введите корректное имя'),
  email: yup
    .string()
    .email('Введите корректную почту c содержанием @ и .')
    .max(25, 'Максимальная длина почты 25 букв')
    .required('Введите почту'),
  password: yup
    .string()
    .min(8, 'Пароль должен быть больше чем 8 символов')
    .max(15, 'Максимальная длина пароль 15 символов')
    .required('Введите пароль'),
});

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

  const { name, email, password } = errors;

  const hundlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISubmit> = async (data) => {
    try {
      console.log('submit data >', JSON.stringify(data));
      const response = await fetch('https://deploy-kanban-manager.herokuapp.com/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const userRegistration = await response.json();
        console.log('userRegistration >', userRegistration);
        reset();
      }
    } catch (e) {
      console.log((e as TypeError).message);
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
            startAdornment: (
              <InputAdornment position="start">
                <EmailSharpIcon />
              </InputAdornment>
            ),
            ...register('email'),
          }}
          error={!!email}
          label="Email"
          helperText={!!email ? email.message : 'Please enter your name'}
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
