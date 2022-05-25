export type ConfirmationModalType = {
  flag: boolean;
  title?: string;
  cbClose?: () => void;
  cbOpen?: () => void;
  cbHandler?: () => void;
  body?: string;
  agree?: string;
  disagree?: string;
};
