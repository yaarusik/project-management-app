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
  isLoginExist: true,
  isCorrectData: true,
  isPendingRegistration: false,
  selectedBoardTitle: '',
  selectedBoardId: JSON.parse(localStorage.getItem('boardId') as string) || '',
  columns: [],
  token: null,
  userData: {
    userId: '',
    login: '',
  },
  userUpdateData: {
    password: '',
    login: '',
    name: '',
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
  order: number;
}

export interface IEditUserData {
  password: string;
  login: string;
  name: string;
}

interface InitialState {
  isModalNewBoard: boolean;
  isModalNewColumn: boolean;
  boards: IBoards[];
  columns: IColumn[];
  selectedBoardTitle: string;
  selectedBoardId: string;
  isAuth: boolean;
  isLoginExist: boolean;
  isCorrectData: boolean;
  isPendingRegistration: boolean;
  token: null | string;
  userData: {
    userId: string;
    login: string;
    iat?: null | number;
  };
  userUpdateData: IEditUserData;
  currentColumnId: string;
  currentColumnOrder: number;
  updateColumn: IColumn[];
}
