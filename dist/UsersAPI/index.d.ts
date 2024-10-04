import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { ChangeUsersPasswordModel, DeleteUserModel, GetAdminPanelUsersQuery, GetUsersQuery, RegisterUserModel } from './types.js';
export declare class UsersAPI {
    private apiService;
    constructor(apiService: ApiService);
    setApiService(apiService: ApiService): void;
    registerUser: (body: RegisterUserModel) => Promise<DataModel<"UserViewModelExtended">>;
    changeUsersPassword: (id: number, body: ChangeUsersPasswordModel) => Promise<any>;
    registerUserAndSetPassword: (body: RegisterUserModel) => Promise<DataModel<"UserViewModelExtended">>;
    registerMultipleUsers: (users: RegisterUserModel[]) => Promise<DataModel<"UserViewModelExtended">[]>;
    getUsers: (query?: GetUsersQuery) => Promise<DataModel<"UserViewModel">[]>;
    getUserById: (id: number) => Promise<DataModel<"UserViewModelExtended">>;
    getAdminPanelUsers: (query?: GetAdminPanelUsersQuery) => Promise<DataModel<"UserMemberViewModel">[]>;
    deleteUser: (id: number, body?: DeleteUserModel) => Promise<any>;
    deleteMultipleUsers: (users: DeleteUserModel[]) => Promise<any>;
}
