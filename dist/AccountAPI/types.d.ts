export interface LoginByEmailAndPasswordModel {
  email: string;
  password: string;
}
export interface LoginAdminByEmailAndPasswordModel {
  email: string;
  password: string;
  language?: string;
  code?: string;
}
export interface LogoutQuery {
  deviceId?: string;
}
export interface TwoFactorViewModel {
  TwoFactorAuthCodeRequired: boolean;
  TwoFactorAuthPhone: string;
  token: string;
  email: string;
  code: string;
}
