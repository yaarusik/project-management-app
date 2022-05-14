import * as yup from 'yup';
import { BASE_URL } from '../../constants';
import { fetchOptions } from '../../utils/api/api';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^([а-яё\s]+|[a-z\s]+)$/gim,
      'Имя может содержать только русские или английские буквы, без цифр'
    )
    .min(2, 'Минимальная длина имени 2 буквы')
    .max(15, 'Максимальная длина имени 15 букв')
    .required('Введите корректное имя'),
  login: yup
    .string()
    .matches(/^[a-z][a-z0-9]*$/i, 'Логин содержить только английские буквы и цифры')
    .min(3, 'Минимальная длина логина 3 буквы')
    .max(15, 'Максимальная длина логина 15 букв')
    .required('Введите логин')
    .test('проверка логина', 'Данный логин уже существует', function () {
      return new Promise((resolve) => {
        fetch(`${BASE_URL}/signin`, {
          ...fetchOptions,
          body: JSON.stringify({ login: this.parent.login, password: this.parent.password }),
        })
          .then(() => resolve(true))
          .catch(() => resolve(false));
      });
    }),
  password: yup
    .string()
    .min(8, 'Пароль должен быть больше чем 8 символов')
    .max(15, 'Максимальная длина пароль 15 символов')
    .required('Введите пароль'),
});
