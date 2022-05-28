import { ITask } from '../../store/initialStates/types';

export interface ITaskProps extends ITask {
  columnId: string;
  order: number;
  description: string;
  updateTask: (tasks: ITask[]) => void;
}
