import * as yup from 'yup';

import i18n from 'i18next';

export const registrationShema = () => {
  return yup.object().shape({
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
};
