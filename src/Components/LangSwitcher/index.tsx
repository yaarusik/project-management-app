import { FormControlLabel, Switch } from '@mui/material';

import { ChangeEvent, useState } from 'react';

const langProps = {
  ru: 'RU',
  en: 'EN',
};

const LangSwitcher = () => {
  const [checked, setChecked] = useState(false);
  const [lang, setLang] = useState(langProps.en);

  const hundleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setChecked(target.checked);
    if (target.checked) {
      setLang(langProps.ru);
    } else {
      setLang(langProps.en);
    }
  };
  return (
    <FormControlLabel label={lang} control={<Switch checked={checked} onChange={hundleChange} />} />
  );
};

export default LangSwitcher;
