import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { OrganizationCreateModel } from './types.js';
export declare class OrganizationsAPI {
  private apiService;
  constructor(apiService: ApiService);
  setApiService: (apiService: ApiService) => void;
  getApiService: () => ApiService;
  createOrganization: (
    body: OrganizationCreateModel
  ) => Promise<DataModel<'OrganizationViewModel'>>;
  getOrganizationById: (
    id: number
  ) => Promise<DataModel<'OrganizationViewModel'>>;
  addUsersToOrganization: (id: number, usersIds: number[]) => Promise<any>;
  removeUserFromSubOrganization: (id: number, userId: number) => Promise<any>;
  removeMultipleUsersFromSubOrganization: (
    id: number,
    usersIds: number[]
  ) => Promise<any>;
  deleteOrganization: (id: number) => Promise<any>;
  /**
   * forceDeleteOrganization
   *
   * Completely removes an organization, including its associated groups, users, and emergency types.
   *
   * @param {string} organizationId - The ID of the organization to delete
   */
  forceDeleteOrganization: (id: number) => Promise<void>;
}
