export class LocationsAPI {
    constructor(apiService) {
        this.setApiService = (apiService) => {
            this.apiService = apiService;
        };
        this.getApiService = () => {
            return this.apiService;
        };
        this.getLocations = async () => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Locations',
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching locations:', error);
                return error;
            }
        };
        this.getLocationById = async (params) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Locations/{id}',
                    options: {
                        params: { path: params },
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching location:', error);
                return error;
            }
        };
        this.createLocation = async (body) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'POST',
                    path: '/api/Locations',
                    options: {
                        body,
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error creating location:', error);
                return error;
            }
        };
        this.apiService = apiService;
    }
}
//# sourceMappingURL=index.js.map