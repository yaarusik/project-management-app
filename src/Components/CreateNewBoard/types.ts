import { SubmitHandler } from 'react-hook-form';
import { IFetchColumn } from '../../Pages/BoardPage/types';
import { IFetchBoard } from '../../Pages/MainPage/types';

export type ITitle = {
  titleName: string;
  submitFunc: SubmitHandler<IFetchBoard> | SubmitHandler<IFetchColumn>;
};
