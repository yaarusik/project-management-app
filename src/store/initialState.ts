const initialState: InitialState = {
  isCreateNewBoard: false,
  isCreateNewColumn: false,
  isDeleteBoard: '',
  boards: [
    {
      id: '',
      title: '',
    },
  ],
  isAuth: false,
  status: null,
  error: null,
  currentBoardTitle: '',
  selectedBoardTitle: '',
  columns: [
    {
      id: '',
      title: '',
      order: 0,
    },
  ],
};

export default initialState;

interface IBoards {
  id: string;
  title: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface InitialState {
  isCreateNewBoard: boolean;
  isCreateNewColumn: boolean;
  isDeleteBoard: string;
  boards: IBoards[];
  columns: IColumn[];
  currentBoardTitle: string;
  selectedBoardTitle: string;
  isAuth: boolean;
  status: null | string;
  error: null | string;
}
