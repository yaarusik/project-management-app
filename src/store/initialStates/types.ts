import { IBoards } from '../initialState';

export interface ITaskInitialState {
  tasks: ITask[];
}

export interface ITask extends IBoards {
  order: number;
  userId: string;
}
