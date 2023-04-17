export type InputsType = {
  email: string;
  password: string;
};

export interface IForm {
  title: string;
  isSignUp: boolean;
  buttonText: string;
  singInAndUp: (params: InputsType) => void;
  error?: string;
}
