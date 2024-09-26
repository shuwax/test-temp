import createClient, { Client } from 'openapi-fetch';
import { ClientType } from './enums.js';
import { paths } from '../schemas.js';
import {
  ApiServiceObject,
  RequestObject,
  RequestOptions,
  RequestResult,
} from './types.js';

export class ApiService {
  private openApiClient: Client<paths, `${string}/${string}`> | undefined =
    undefined;

  private baseUrl: string;
  private csrfToken: string | undefined = undefined;
  private cookies: string[] | undefined = undefined;
  private clientType: ClientType;

  constructor(baseUrl: string, clientType: ClientType = ClientType.Web) {
    this.baseUrl = baseUrl;
    this.clientType = clientType;
    this.openApiClient = createClient<paths>({ baseUrl });
  }

  async makeRequest<T>({
    method,
    path,
    options,
  }: RequestObject): Promise<RequestResult<T>> {
    try {
      const requestOptions: RequestOptions = {
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getOpenApiClient(): Client<paths, `${string}/${string}`> {
    return this.openApiClient;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getCSRFToken(): string | undefined {
    return this.csrfToken;
  }

  getCookies(): string[] | undefined {
    return this.cookies;
  }

  getClientType(): ClientType {
    return this.clientType;
  }

  getApiServiceObject(): ApiServiceObject {
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

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.openApiClient = createClient<paths>({ baseUrl });
  }

  setCSRFToken(csrfToken: string | undefined) {
    this.csrfToken = csrfToken;
  }

  setCookies(cookies: string[] | undefined) {
    this.cookies = cookies;
  }

  setClientType(clientType: ClientType) {
    this.clientType = clientType;
  }
}
