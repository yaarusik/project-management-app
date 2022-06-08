import { ITask } from '../../store/initialStates/types';

export const sortTask = (tasks: ITask[]) => tasks.sort((a: ITask, b: ITask) => a.order - b.order);
