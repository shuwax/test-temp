import { ApiService } from '../ApiService/index.js';
import { QueryParameters } from '../types.js';

export class MessagesAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }
}
