import { IEditUserData } from '../../store/initialState';

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

export type IDeleteColumn = {
  boardId: string;
  columnId: string;
  token: string;
};

<<<<<<< HEAD
export type ICreateTask = {
  url: {
    boardId: string;
    columnId: string;
  };
  body: {
    title: string;
    description: string;
    userId: string;
  };
  token: string | null;
};

export type IUpdateTask = {
  url: {
    boardId: string;
    columnId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
  token: string | null;
};

export type IDeleteTask = {
  url: {
    boardId: string;
    columnId: string;
    taskId: string;
  };
  token: string;
};
=======
export interface IEditUserApi {
  userID?: string | undefined | null;
  token?: string;
  userData?: IEditUserData;
}
>>>>>>> develop
