import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { LoginAdminByEmailAndPasswordModel, LoginByEmailAndPasswordModel, LogoutQuery } from './types.js';
export declare class AccountAPI {
    private apiService;
    constructor(apiService: ApiService);
    setApiService: (apiService: ApiService) => void;
    getApiService: () => ApiService;
    getAntiForgeryToken: () => Promise<any>;
    loginByEmailAndPassword: (body: LoginByEmailAndPasswordModel) => Promise<DataModel<"UserInfoViewModel">>;
    loginAdminByEmailAndPassword: (body: LoginAdminByEmailAndPasswordModel) => Promise<DataModel<"UserInfoViewModel">>;
    getUserInfo: () => Promise<DataModel<"UserInfoViewModel">>;
    logout: (query?: LogoutQuery) => Promise<any>;
}
