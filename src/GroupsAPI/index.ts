import { ApiService } from '../ApiService/index.js';
import { paths } from '../schemas.js';
import { PathParameters, QueryParameters } from '../types.js';

export class GroupsAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService = (apiService: ApiService) => {
    this.apiService = apiService;
  };

  getApiService = () => {
    return this.apiService;
  };

  getGroups = async (query?: QueryParameters<'/api/Groups', 'get'>) => {
    try {
      const { data } = await this.apiService.makeRequest({
        method: 'GET',
        path: '/api/Groups',
        options: {
          params: { query },
        },
      });

      return data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      return error;
    }
  };

  getGroupById = async (params: PathParameters<'/api/Groups/{id}', 'get'>) => {
    try {
      const { data } = await this.apiService.makeRequest({
        method: 'GET',
        path: '/api/Groups/{id}',
        options: {
          params: { path: params },
        },
      });

      return data;
    } catch (error) {
      console.error('Error fetching group by id:', error);
      return error;
    }
  };

  getGroupMembers = async (
    params: PathParameters<'/api/Groups/{id}/members', 'get'>,
    query?: QueryParameters<'/api/Groups/{id}/members', 'get'>
  ) => {
    try {
      const { data } = await this.apiService.makeRequest({
        method: 'GET',
        path: '/api/Groups/{id}/members',
        options: {
          params: { path: params, query },
        },
      });

      return data;
    } catch (error) {
      console.error('Error fetching group members:', error);
      return error;
    }
  };

  getGroupLocations = async (
    params: paths['/api/Groups/{id}/locations']['get']['parameters']['path']
  ) => {
    try {
      const { data } = await this.apiService.makeRequest({
        method: 'GET',
        path: '/api/Groups/{id}/locations',
        options: {
          params: { path: params },
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching group locations:', error);
      return error;
    }
  };

  activatePanicAlarm = async (
    body: paths['/api/Groups/activateAlarms']['post']['requestBody']['content']['application/json']
  ) => {
    try {
      const { data } = await this.apiService.makeRequest<
        paths['/api/Groups/activateAlarms']['post']['responses']['200']['content']['application/json']
      >({
        method: 'GET',
        path: '/api/Groups/activateAlarms',
        options: {
          body,
        },
      });
      return data;
    } catch (error) {
      console.error('Error activating alarm:', error);
      return error;
    }
  };

  deactivatePanicAlarm = async (
    body: paths['/api/Groups/deactivateAlarms']['post']['requestBody']['content']['application/json']
  ) => {
    try {
      const { data } = await this.apiService.makeRequest({
        method: 'GET',
        path: '/api/Groups/deactivateAlarms',
        options: {
          body,
        },
      });
      return data;
    } catch (error) {
      console.error('Error activating alarm:', error);
      return error;
    }
  };
}
