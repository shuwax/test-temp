import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { CreateLocationModel } from './types.js';
export declare class LocationsAPI {
    private apiService;
    constructor(apiService: ApiService);
    setApiService: (apiService: ApiService) => void;
    getApiService: () => ApiService;
    getLocations: () => Promise<any>;
    getLocationById: (id: number) => Promise<DataModel<"LocationViewModel">>;
    createLocation: (body: CreateLocationModel) => Promise<DataModel<"LocationViewModel">>;
}
