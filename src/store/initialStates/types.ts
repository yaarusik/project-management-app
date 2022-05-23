export interface ITaskInitialState {
  tasks: ITask[];
  taskDescription: ITaskDescription;
  isBar: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
}

export interface ITaskDescription {
  userId: string;
  title: string;
  description: string;
}
