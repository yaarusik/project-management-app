import { ITask } from '../../store/initialStates/types';

export type IFunc = {
  closeInput: () => void;
  updateTasks: (val: ITask[]) => void;
  closeTextarea: () => void;
};
