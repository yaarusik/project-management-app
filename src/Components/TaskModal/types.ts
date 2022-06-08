import { ITask } from '../../store/initialStates/types';

export interface ITaskOptions {
  id: string;
  isModal: boolean;
  closeModal: () => void;
  addTask: (task: ITask) => void;
}

export interface IModalParam {
  title: string;
  textarea: string;
}
