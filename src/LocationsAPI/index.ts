import { ApiService } from '../ApiService/index.js';
import { DataModel, PathParameters } from '../types.js';

export class LocationsAPI {
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

  getLocations = async () => {
    try {
      const { data } = await this.apiService.makeRequest<
        DataModel<'LocationViewModel'>
      >({
        method: 'GET',
        path: '/api/Locations',
      });
      return data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      return error;
    }
  };

  getLocationById = async (
    params: PathParameters<'/api/Locations/{id}', 'get'>
  ) => {
    try {
      const { data } = await this.apiService.makeRequest<
        DataModel<'LocationViewModel'>
      >({
        method: 'GET',
        path: '/api/Locations/{id}',
        options: {
          params: { path: params },
        },
      });

      return data;
    } catch (error) {
      console.error('Error fetching location:', error);
      return error;
    }
  };

  createLocation = async (body: DataModel<'CreateLocationBindingModel'>) => {
    try {
      const { data } = await this.apiService.makeRequest<
        DataModel<'LocationViewModel'>
      >({
        method: 'POST',
        path: '/api/Locations',
        options: {
          body,
        },
      });

      return data;
    } catch (error) {
      console.error('Error creating location:', error);
      return error;
    }
  };
}
