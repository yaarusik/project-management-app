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
  isSnackbar: false,
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
  isModalNewBoard: boolean;
  isModalNewColumn: boolean;
  boards: IBoards[];
  columns: IColumn[];
  selectedBoardTitle: string;
  isAuth: boolean;
  isSnackbar: boolean;
}
