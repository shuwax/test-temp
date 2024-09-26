import axios from 'axios';
export class Account {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.getAntiForgeryToken = async () => {
      try {
        // const { data, response, error } = await this.apiService.makeRequest({
        //   method: 'GET',
        //   path: '/api/Account/AntiForgeryToken',
        // });
        // if (error) {
        //   throw error;
        // }
        // const token = data.requestVerificationToken;
        // const cookies = response.headers.get('set-cookie');
        // this.apiService.setCSRFToken(token);
        // this.apiService.setCookies([cookies]);
        const apiServiceObject = this.apiService.getApiServiceObject();
        const response = await axios.get(
          `${apiServiceObject.baseUrl}/api/Account/AntiForgeryToken`,
          {
            withCredentials: true, // Ensure cookies are sent and received
          }
        );
        const token = response.data.requestVerificationToken;
        const cookies = response.headers['set-cookie'];
        this.apiService.setCSRFToken(token);
        this.apiService.setCookies(cookies);
      } catch (error) {
        console.error('Error fetching AntiForgeryToken:', error);
        return error;
      }
    };
    this.login = async (body) => {
      try {
        const openApiClient = this.apiService.getOpenApiClient();
        const { data, error, response } = await openApiClient.POST(
          '/api/Account/Login',
          {
            body,
            headers: this.apiService.getRequestHeaders(),
          }
        );
        if (error) {
          throw error;
        }
        // const { data, response, error } = await this.apiService.makeRequest({
        //   method: 'POST',
        //   path: '/api/Account/Login',
        //   options: { body },
        // });
        // if (error) {
        //   throw error;
        // }
        const cookies = response.headers.get('set-cookie');
        // console.log('New cookies', cookies);
        this.apiService.setCookies([...this.apiService.getCookies(), cookies]);
        return data;
      } catch (error) {
        console.error('Error logging in:', error);
        return error;
      }
    };
    this.logout = async (query) => {
      try {
        // console.log(this.apiService.getRequestHeaders());
        // const { error } = await this.apiService.makeRequest({
        //   method: 'POST',
        //   path: '/api/Account/Login',
        //   // options: { params: { query } },
        // });
        // if (error) {
        //   throw error;
        // }
        const openApiClient = this.apiService.getOpenApiClient();
        const { error } = await openApiClient.POST('/api/Account/Logout', {
          params: {
            query,
          },
          headers: this.apiService.getRequestHeaders(),
        });
        if (error) {
          throw error;
        }
        console.log('Logout successful');
      } catch (error) {
        console.error('Error logging out:', error);
        return error;
      }
    };
    this.apiService = apiService;
  }
}
//# sourceMappingURL=index.js.map
