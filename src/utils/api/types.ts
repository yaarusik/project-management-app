export interface IAddBoard {
  title: string;
  description: string;
  token: string;
}

export interface IDeleteBoard {
  id: string;
  token: string;
}

export type IColumnData = {
  title: string | undefined;
  order: number | undefined;
};

export type IAddColumn = {
  boardId: string;
  title: string;
  token: string;
};

export type IUpdateColumn = {
  boardId: string;
  columnId: string;
  columnData: IColumnData;
  token: string | null;
};

export interface IGetColumns {
  selectedBoardId: string;
  token: string | null;
}
