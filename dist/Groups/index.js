// import { GetGroupsQuery, Group } from "./types.js";
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
        const openApiClient = this.apiService.getOpenApiClient();
        const { data, error } = await openApiClient.GET('/api/Groups', {
          params: { query },
          headers: this.apiService.getRequestHeaders(false),
        });
        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
        console.error('Error fetching groups:', error);
        return error;
      }
    };
    this.getGroupById = async (params) => {
      try {
        const response = await this.apiService.makeRequest({
          method: 'GET',
          path: '/api/Groups/{id}',
          options: {
            params: { path: params },
          },
        });
        console.log(response);
        return response;
        const openApiClient = this.apiService.getOpenApiClient();
        const { data, error } = await openApiClient.GET('/api/Groups/{id}', {
          params: { path: params },
          headers: this.apiService.getRequestHeaders(false),
        });
        if (error) {
          throw error;
        }
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching group by id:', error);
        return error;
      }
    };
    this.getGroupMembers = async (params) => {
      try {
        const response = await this.apiService.makeRequest({
          method: 'GET',
          path: '/api/Groups/{id}/members',
          options: {
            params: { path: params },
          },
        });
        return response;
        // const openApiClient = this.apiService.getOpenApiClient();
        // const { data, error } = await openApiClient.GET(
        //   '/api/Groups/{id}/members',
        //   {
        //     params: { path: params },
        //     headers: this.apiService.getRequestHeaders(false),
        //   }
        // );
        // if (error) {
        //   throw error;
        // }
        // console.log(data);
        // return data;
      } catch (error) {
        console.error('Error fetching group members:', error);
        return error;
      }
    };
    this.apiService = apiService;
  }
}
//# sourceMappingURL=index.js.map
