import { FormControlLabel, Switch } from '@mui/material';

import { ChangeEvent, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const langProps = {
  ru: 'ru',
  en: 'en',
};

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const [checked, setChecked] = useState(i18n.language === langProps.ru ? true : false);

  useEffect(() => {
    if (i18n.language === langProps.ru) {
      i18n.changeLanguage(langProps.ru);
      setChecked(true);
    }
  }, []);

  const changeLangs = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    setChecked(target.checked);
    if (target.checked) {
      await i18n.changeLanguage(langProps.ru);
    } else {
      await i18n.changeLanguage(langProps.en);
    }
    Cookies.set('i18next', i18n.language);
  };

  return (
    <FormControlLabel
      label={i18n.language.toUpperCase()}
      control={<Switch color="secondary" checked={checked} onChange={changeLangs} />}
    />
  );
};

export default LangSwitcher;
