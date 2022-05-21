const initialState: InitialState = {
  isModalNewBoard: false,
  isModalNewColumn: false,
  boards: [
    {
      id: '',
      title: '',
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
};

export default initialState;

interface IBoards {
  id: string;
  title: string;
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
}
