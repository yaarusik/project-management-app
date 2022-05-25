import { ITask } from '../../store/initialStates/types';

export interface ITaskProps {
  title: string;
  author: string;
  id: string;
  columnId: string;
  order: number;
  description: string;
  updateTask: (tasks: ITask[]) => void;
}
