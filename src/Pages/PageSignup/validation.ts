import * as yup from 'yup';
import { BASE_URL } from '../../constants';
import { fetchOptions } from '../../utils/api/auth';
import i18n from 'i18next';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([а-яё\s]+|[a-z\s]+)$/gim, i18n.t('validation.name.message'))
    .min(2, i18n.t('validation.name.min'))
    .max(15, i18n.t('validation.name.max'))
    .required(i18n.t('validation.name.required')),
  login: yup
    .string()
    .matches(/^[a-z][a-z0-9]*$/i, i18n.t('validation.login.message'))
    .min(3, i18n.t('validation.login.min'))
    .max(15, i18n.t('validation.login.max'))
    .required(i18n.t('validation.login.required')),
  password: yup
    .string()
    .min(8, i18n.t('validation.password.min'))
    .max(15, i18n.t('validation.password.max'))
    .required(i18n.t('validation.password.required')),
});

// .test('проверка логина', 'Данный логин уже существует', function () {
//   return new Promise((resolve) => {
//     fetch(`${BASE_URL}/signup`, {
//       ...fetchOptions,
//       body: JSON.stringify({
//         login: this.parent.login,
//         password: this.parent.password,
//         name: this.parent.name,
//       }),
//     })
//       .then((res) => {
//         if (res.status === 409) {
//           resolve(true);
//         } else {
//           resolve(true);
//         }
//       })
//       .catch(() => resolve(true));
//   });
// }),
