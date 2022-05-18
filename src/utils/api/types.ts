export interface IAddBoard {
  title: string;
  token: string;
}

export interface IDeleteBoard {
  id: string;
  token: string;
}

export type IColumnData = {
  title: string;
  order: number | undefined;
};

export type IAddColumn = {
  boardId: string;
  columnData: IColumnData;
  token: string;
};

export interface IGetColumns {
  selectedBoardId: string;
  token: string;
}
