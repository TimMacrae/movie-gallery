export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface SigninRequestBody {
  email: string;
  password: string;
}
