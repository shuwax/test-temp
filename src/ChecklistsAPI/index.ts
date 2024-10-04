import { ApiService } from '../ApiService/index.js';
import { PathParameters, QueryParameters } from '../types.js';

export class ChecklistsAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }
}
