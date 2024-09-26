import createClient from 'openapi-fetch';
import { ClientType } from './enums.js';
export class ApiService {
    constructor(baseUrl, clientType = ClientType.Web) {
        this.openApiClient = undefined;
        this.csrfToken = undefined;
        this.cookies = undefined;
        this.baseUrl = baseUrl;
        this.clientType = clientType;
        this.openApiClient = createClient({ baseUrl });
    }
    async makeRequest({ method, path, options, }) {
        try {
            const requestOptions = {
                ...options,
                headers: options?.headers ?? this.getRequestHeaders(),
            };
            const res = await this.openApiClient[method](path, {
                ...requestOptions,
            });
            const { data, response, error } = res;
            if (path === '/api/Account/Logout') {
                console.log(requestOptions);
            }
            if (error) {
                throw error;
            }
            return { data, response };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    getOpenApiClient() {
        return this.openApiClient;
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    getCSRFToken() {
        return this.csrfToken;
    }
    getCookies() {
        return this.cookies;
    }
    getClientType() {
        return this.clientType;
    }
    getApiServiceObject() {
        return {
            openApiClient: this.openApiClient,
            baseUrl: this.baseUrl,
            csrfToken: this.csrfToken,
            cookies: this.cookies,
            clientType: this.clientType,
        };
    }
    getRequestHeaders(includeCsrfToken = true, includeCookies = true) {
        return {
            ...(includeCsrfToken &&
                this.csrfToken && { 'X-XSRF-TOKEN': this.csrfToken }),
            ...(includeCookies &&
                this.cookies && {
                Cookie: `${this.cookies.join(';')}`,
            }),
        };
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        this.openApiClient = createClient({ baseUrl });
    }
    setCSRFToken(csrfToken) {
        this.csrfToken = csrfToken;
    }
    setCookies(cookies) {
        this.cookies = cookies;
    }
    setClientType(clientType) {
        this.clientType = clientType;
    }
}
//# sourceMappingURL=index.js.map