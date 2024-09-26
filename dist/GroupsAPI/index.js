export class GroupsAPI {
    constructor(apiService) {
        this.setApiService = (apiService) => {
            this.apiService = apiService;
        };
        this.getApiService = () => {
            return this.apiService;
        };
        this.getGroups = async (query) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups',
                    options: {
                        params: { query },
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching groups:', error);
                return error;
            }
        };
        this.getGroupById = async (params) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups/{id}',
                    options: {
                        params: { path: params },
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching group by id:', error);
                return error;
            }
        };
        this.getGroupMembers = async (params, query) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups/{id}/members',
                    options: {
                        params: { path: params, query },
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching group members:', error);
                return error;
            }
        };
        this.getGroupLocations = async (params) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups/{id}/locations',
                    options: {
                        params: { path: params },
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error fetching group locations:', error);
                return error;
            }
        };
        this.activatePanicAlarm = async (body) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups/activateAlarms',
                    options: {
                        body,
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error activating alarm:', error);
                return error;
            }
        };
        this.deactivatePanicAlarm = async (body) => {
            try {
                const { data } = await this.apiService.makeRequest({
                    method: 'GET',
                    path: '/api/Groups/deactivateAlarms',
                    options: {
                        body,
                    },
                });
                return data;
            }
            catch (error) {
                console.error('Error activating alarm:', error);
                return error;
            }
        };
        this.apiService = apiService;
    }
}
//# sourceMappingURL=index.js.map