export type IFetchColumn = {
  id: string;
  title: string;
};

export const dndTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

export interface Item {
  id: string;
  title: string;
  order: number;
}
