import { ISubmit } from '../PageSignup/types';

export type IAuthorization = Pick<ISubmit, 'login' | 'password'>;
