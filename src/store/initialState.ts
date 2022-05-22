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
  selectedBoardTitle: '',
  selectedBoardId: '',
  columns: [],
  token: null,
  userData: {
    userId: '',
    login: '',
  },
  currentColumnId: '',
  currentColumnOrder: 0,
  updateColumn: [],
};

export default initialState;

export interface IBoards {
  id: string;
  title: string;
  description: string;
}

export interface IColumn {
  id: string;
  title: string;
  order?: number;
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
  token: null | string;
  userData: {
    userId: string;
    login: string;
    iat?: null | number;
  };
  currentColumnId: string;
  currentColumnOrder: number;
  updateColumn: IColumn[];
}
