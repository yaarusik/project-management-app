export interface ITaskInitialState {
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
}
