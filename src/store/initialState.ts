const initialState: InitialState = {
  isCreateNewBoard: false,
  boards: [
    {
      id: '',
      title: '',
    },
  ],
  title: '',
  isAuth: false,
  isSnackbar: false,
};

export default initialState;

interface IBoards {
  id: string;
  title: string;
}

interface InitialState {
  isCreateNewBoard: boolean;
  boards: IBoards[];
  title: string;
  isAuth: boolean;
  isSnackbar: boolean;
}
