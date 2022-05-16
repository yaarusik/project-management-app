const initialState = {
  isCreateNewBoard: false,
  isCreateNewColumn: false,
  isDeleteBoard: '',
  boards: [
    {
      id: '',
      title: '',
    },
  ],
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
