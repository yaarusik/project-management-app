import { SubmitHandler } from 'react-hook-form';
import { IFetchBoard } from '../../Pages/MainPage/indexTypes';

export type ITitle = {
  titleName: string;
  submitFunc: SubmitHandler<IFetchBoard>;
};
