/* eslint-disable @typescript-eslint/no-empty-object-type */
import createOpenAPIClient from 'openapi-fetch';
import { ClientType } from './enums.js';
import * as qs from 'qs';
import { createError, getRequestHeaders } from './helpers.js';
const emptyResponseStatuses = [200, 204];
export class ApiService {
    constructor(baseUrl, clientType = ClientType.Web) {
        this.openApiClient = undefined;
        this.csrfToken = undefined;
        this.cookies = undefined;
        this.baseUrl = baseUrl;
        this.clientType = clientType;
        this.openApiClient = this.createClient({ baseUrl });
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
            if (error) {
                throw error;
            }
            return { data, response };
        }
        catch (error) {
            console.error(error);
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
    createClient(clientOptions) {
        const options = {
            querySerializer: (query) => {
                return qs.stringify(query, { arrayFormat: 'repeat' });
            },
        };
        const client = createOpenAPIClient({
            ...options,
            ...clientOptions,
        });
        const csrfToken = () => this.csrfToken;
        const cookies = () => this.cookies;
        function addAuthorizationHeader(options) {
            const updatedHeaders = options?.headers ?? getRequestHeaders(csrfToken(), cookies());
            return {
                ...options,
                headers: updatedHeaders,
            };
        }
        return {
            async GET(url, init) {
                const { data, error, response } = await client.GET(url, addAuthorizationHeader(init));
                if (data || emptyResponseStatuses.includes(response?.status)) {
                    return { data, response };
                }
                throw createError(error, response);
            },
            async PUT(url, init) {
                const { data, error, response } = await client.PUT(url, addAuthorizationHeader(init));
                if (data || emptyResponseStatuses.includes(response?.status)) {
                    return { data, response };
                }
                throw createError(error, response);
            },
            async POST(url, init) {
                const { data, error, response } = await client.POST(url, addAuthorizationHeader(init));
                if (data || emptyResponseStatuses.includes(response?.status)) {
                    return { data, response };
                }
                throw createError(error, response);
            },
            async DELETE(url, init) {
                const { data, error, response } = await client.DELETE(url, addAuthorizationHeader(init));
                if (data || emptyResponseStatuses.includes(response?.status)) {
                    return { data, response };
                }
                throw createError(error, response);
            },
        };
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        this.openApiClient = this.createClient({ baseUrl });
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