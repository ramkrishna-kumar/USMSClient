import { UserViewModel } from '../view-models/user-view-model';

export class LoginResponse {
  token: string;
  expiry: Date;
  signoutUrl: string;
  userContext: UserViewModel;
}