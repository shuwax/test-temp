import { ApiService } from '../../ApiService/index.js';
import { DataModel } from '../../types.js';
import { OrganizationCreateModel } from './types.js';
export declare class AdminOrganizationsAPI {
  private apiService;
  constructor(apiService: ApiService);
  setApiService: (apiService: ApiService) => void;
  getApiService: () => ApiService;
  createOrganization: (
    body: OrganizationCreateModel
  ) => Promise<DataModel<'OrganizationViewModel'>>;
  deleteOrganization: (id: number) => Promise<any>;
}
