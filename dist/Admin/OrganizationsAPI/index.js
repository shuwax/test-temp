export class AdminOrganizationsAPI {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.createOrganization = async (body) => {
      try {
        const { data } = await this.apiService
          .getOpenApiClient()
          .POST('/api/Admin/Organizations/Create', { body });
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error creating organization:', error);
        return error;
      }
    };
    this.deleteOrganization = async (id) => {
      try {
        const { data } = await this.apiService
          .getOpenApiClient()
          .DELETE('/api/Admin/Organizations/{id}/Delete', {
            params: { path: { id } },
          });
        return data;
      } catch (error) {
        console.error('Error deleteing organization:', error);
        return error;
      }
    };
    this.apiService = apiService;
  }
}
//# sourceMappingURL=index.js.map
