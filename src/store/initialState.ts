const initialState: InitialState = {
  isModalNewBoard: false,
  isModalNewColumn: false,
  boards: [
    {
      id: '',
      title: '',
      description: '',
    },
  ],
  isAuth: false,
  isPendingAuth: false,
  isPendingRegistration: false,
  isSnackbar: false,
  isTaskModal: false,
  selectedBoardTitle: '',
  selectedBoardId: JSON.parse(window.localStorage.getItem('boardId') as string) || '',
  columns: [],
  token: null,
  currentColumnId: '',
  currentColumnOrder: 0,
  updateColumn: [],
};

export default initialState;

interface IBoards {
  id: string;
  title: string;
  description: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface InitialState {
  isModalNewBoard: boolean;
  isModalNewColumn: boolean;
  boards: IBoards[];
  columns: IColumn[];
  selectedBoardTitle: string;
  selectedBoardId: string;
  isAuth: boolean;
  isPendingAuth: boolean;
  isPendingRegistration: boolean;
  isSnackbar: boolean;
  isTaskModal: boolean;
  token: null | string;
  currentColumnId: string;
  currentColumnOrder: number;
  updateColumn: IColumn[];
}
