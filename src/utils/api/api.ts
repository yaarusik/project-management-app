import { ISubmit } from '../../Pages/PageSignup/indexTypes';

const fetchOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const api = {
  registration: (data: ISubmit) =>
    fetch('https://deploy-kanban-manager.herokuapp.com/signup', {
      ...fetchOptions,
      body: JSON.stringify(data),
    }),
  authorization: (login: string, password: string) =>
    fetch('https://deploy-kanban-manager.herokuapp.com/signin', {
      ...fetchOptions,
      body: JSON.stringify({ login, password }),
    }),
};
