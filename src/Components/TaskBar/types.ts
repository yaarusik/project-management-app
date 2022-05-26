import { ITask } from '../../store/initialStates/types';

export interface ITaskBar {
  updateTasks: (value: ITask[]) => void;
}
