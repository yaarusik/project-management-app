import { ISubmit } from '../PageSignup/indexTypes';

export type IAuthorization = Pick<ISubmit, 'login' | 'password'>;
