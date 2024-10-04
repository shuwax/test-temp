import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { CreateEmergencyTypeModel } from './types.js';
export declare class AlarmsAPI {
    private apiService;
    constructor(apiService: ApiService);
    setApiService(apiService: ApiService): void;
    createEmergencyType: (body: CreateEmergencyTypeModel) => Promise<DataModel<"EmergencyTypeViewModel">>;
    getEmergencyTypes: () => Promise<DataModel<"EmergencyTypeViewModel">[]>;
    getEmergencyTypesByOrganizationId: (id: number) => Promise<DataModel<"EmergencyTypeViewModel">[]>;
    deleteMultipleEmergencyTypes: (emergencyTypesIds: number[]) => Promise<any>;
}
