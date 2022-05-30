import * as yup from 'yup';

import i18n from 'i18next';

export const authSchema = () => {
  return yup.object().shape({
    login: yup.string().required(i18n.t(`validation.login.required`)),
    password: yup.string().required(i18n.t(`validation.password.required`)),
  });
};
