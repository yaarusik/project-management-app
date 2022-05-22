export type ConfirmationModalType = {
  flag: boolean;
  title?: string;
  cbClose?: () => void;
  cbOpen?: () => void;
  body?: string;
  agree?: string;
  disagree?: string;
};
