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
  status: null,
  error: null,
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
  status: null | string;
  error: null | string;
}
