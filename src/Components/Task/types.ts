import { ITask } from '../../store/initialStates/types';

export interface ITaskProps extends ITask {
  columnId: string;
  updateTask: (tasks: ITask[]) => void;
}
