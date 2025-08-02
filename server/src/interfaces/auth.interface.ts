export interface ILogin {
  email: string;
  password: string;
  phone?: string;
}

export interface IRegister extends ILogin {
  name: string;

}

export interface IAuthResponse {
  user: {
   
    name: string;
    email: string;
    user_ucode: string;
  };
  token: string;
}