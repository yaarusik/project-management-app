export interface ITaskOptions {
  id: string;
  order: number;
  isModal: boolean;
  closeModal: () => void;
}
