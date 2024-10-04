import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { AddGroupMemberModel, GetAdminPanelGroupsQuery, GetGroupMembersQuery, GetGroupsQuery, RegisterGroupModel } from './types.js';
export declare class GroupsAPI {
    private apiService;
    constructor(apiService: ApiService);
    setApiService: (apiService: ApiService) => void;
    getApiService: () => ApiService;
    registerGroup: (body: RegisterGroupModel) => Promise<DataModel<"GroupViewModel">>;
    addGroupMember: (id: number, body: AddGroupMemberModel) => Promise<DataModel<"UserAndGroupViewModel">>;
    addMultipleGroupMembers: (body: AddGroupMemberModel[]) => Promise<DataModel<"UserAndGroupViewModel">>;
    deleteGroup: (id: number) => Promise<any>;
    deleteMultipleGroups: (groupsIds: number[]) => Promise<any>;
    getGroups: (query?: GetGroupsQuery) => Promise<DataModel<"GroupViewModelExtended">[]>;
    getAdminPanelGroups: (query?: GetAdminPanelGroupsQuery) => Promise<DataModel<"GroupViewModelExtended">[]>;
    getGroupById: (id: number) => Promise<DataModel<"GroupViewModelExtended">>;
    getGroupMembers: (id: number, query?: GetGroupMembersQuery) => Promise<DataModel<"GroupMemberViewModel">[]>;
    getGroupLocations: (id: number) => Promise<DataModel<"LocationViewModel">[]>;
}
