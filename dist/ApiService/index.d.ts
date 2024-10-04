import createOpenAPIClient, { FetchOptions } from 'openapi-fetch';
import { ClientType } from './enums.js';
import { paths } from '../schemas.js';
import { RequestObject, RequestResult } from './types.js';
import { FilterKeys, PathsWithMethod } from 'openapi-typescript-helpers';
export declare class ApiService {
  private openApiClient;
  private baseUrl;
  private csrfToken;
  private cookies;
  private clientType;
  constructor(baseUrl: string, clientType?: ClientType);
  makeRequest<T>({
    method,
    path,
    options,
  }: RequestObject): Promise<RequestResult<T>>;
  getOpenApiClient(): ReturnType<typeof this.createClient<paths>>;
  getBaseUrl(): string;
  getCSRFToken(): string | undefined;
  getCookies(): string[] | undefined;
  getClientType(): ClientType;
  getRequestHeaders(
    includeCsrfToken?: boolean,
    includeCookies?: boolean
  ): {
    Cookie: string;
    'X-XSRF-TOKEN': string;
  };
  createClient<Paths extends {}>(
    clientOptions: Parameters<typeof createOpenAPIClient>[0]
  ): {
    GET<P extends PathsWithMethod<Paths, 'get'>>(
      url: P,
      init?: FetchOptions<FilterKeys<Paths[P], 'get'>>
    ): Promise<{
      data: import('openapi-fetch').ParseAsResponse<
        import('openapi-typescript-helpers').SuccessResponse<
          import('openapi-typescript-helpers').ResponseObjectMap<
            Paths[P]['get']
          >,
          `${string}/${string}`
        >,
        import('openapi-fetch').ParamsOption<FilterKeys<Paths[P], 'get'>> &
          import('openapi-fetch').RequestBodyOption<
            FilterKeys<Paths[P], 'get'>
          > & {
            baseUrl?: string;
            querySerializer?:
              | import('openapi-fetch').QuerySerializerOptions
              | import('openapi-fetch').QuerySerializer<
                  FilterKeys<Paths[P], 'get'>
                >;
            bodySerializer?: import('openapi-fetch').BodySerializer<
              FilterKeys<Paths[P], 'get'>
            >;
            parseAs?: import('openapi-fetch').ParseAs;
            fetch?: import('openapi-fetch').ClientOptions['fetch'];
            headers?: import('openapi-fetch').HeadersOptions;
          } & {
            headers:
              | [string, string][]
              | Headers
              | Record<
                  string,
                  string | number | boolean | (string | number | boolean)[]
                >
              | {
                  Cookie: string;
                  'X-XSRF-TOKEN': string;
                  'Content-Type': string;
                };
            signal?: AbortSignal | null;
            window?: null;
            priority?: RequestPriority;
            referrer?: string;
            method?: string;
            cache?: RequestCache;
            credentials?: RequestCredentials;
            integrity?: string;
            keepalive?: boolean;
            mode?: RequestMode;
            redirect?: RequestRedirect;
            referrerPolicy?: ReferrerPolicy;
          }
      >;
      response: Response;
    }>;
    PUT<P extends PathsWithMethod<Paths, 'put'>>(
      url: P,
      init?: FetchOptions<FilterKeys<Paths[P], 'put'>>
    ): Promise<{
      data: import('openapi-fetch').ParseAsResponse<
        import('openapi-typescript-helpers').SuccessResponse<
          import('openapi-typescript-helpers').ResponseObjectMap<
            Paths[P]['put']
          >,
          `${string}/${string}`
        >,
        import('openapi-fetch').ParamsOption<FilterKeys<Paths[P], 'put'>> &
          import('openapi-fetch').RequestBodyOption<
            FilterKeys<Paths[P], 'put'>
          > & {
            baseUrl?: string;
            querySerializer?:
              | import('openapi-fetch').QuerySerializerOptions
              | import('openapi-fetch').QuerySerializer<
                  FilterKeys<Paths[P], 'put'>
                >;
            bodySerializer?: import('openapi-fetch').BodySerializer<
              FilterKeys<Paths[P], 'put'>
            >;
            parseAs?: import('openapi-fetch').ParseAs;
            fetch?: import('openapi-fetch').ClientOptions['fetch'];
            headers?: import('openapi-fetch').HeadersOptions;
          } & {
            headers:
              | [string, string][]
              | Headers
              | Record<
                  string,
                  string | number | boolean | (string | number | boolean)[]
                >
              | {
                  Cookie: string;
                  'X-XSRF-TOKEN': string;
                  'Content-Type': string;
                };
            signal?: AbortSignal | null;
            window?: null;
            priority?: RequestPriority;
            referrer?: string;
            method?: string;
            cache?: RequestCache;
            credentials?: RequestCredentials;
            integrity?: string;
            keepalive?: boolean;
            mode?: RequestMode;
            redirect?: RequestRedirect;
            referrerPolicy?: ReferrerPolicy;
          }
      >;
      response: Response;
    }>;
    POST<P extends PathsWithMethod<Paths, 'post'>>(
      url: P,
      init?: FetchOptions<FilterKeys<Paths[P], 'post'>>
    ): Promise<{
      data: import('openapi-fetch').ParseAsResponse<
        import('openapi-typescript-helpers').SuccessResponse<
          import('openapi-typescript-helpers').ResponseObjectMap<
            Paths[P]['post']
          >,
          `${string}/${string}`
        >,
        import('openapi-fetch').ParamsOption<FilterKeys<Paths[P], 'post'>> &
          import('openapi-fetch').RequestBodyOption<
            FilterKeys<Paths[P], 'post'>
          > & {
            baseUrl?: string;
            querySerializer?:
              | import('openapi-fetch').QuerySerializerOptions
              | import('openapi-fetch').QuerySerializer<
                  FilterKeys<Paths[P], 'post'>
                >;
            bodySerializer?: import('openapi-fetch').BodySerializer<
              FilterKeys<Paths[P], 'post'>
            >;
            parseAs?: import('openapi-fetch').ParseAs;
            fetch?: import('openapi-fetch').ClientOptions['fetch'];
            headers?: import('openapi-fetch').HeadersOptions;
          } & {
            headers:
              | [string, string][]
              | Headers
              | Record<
                  string,
                  string | number | boolean | (string | number | boolean)[]
                >
              | {
                  Cookie: string;
                  'X-XSRF-TOKEN': string;
                  'Content-Type': string;
                };
            signal?: AbortSignal | null;
            window?: null;
            priority?: RequestPriority;
            referrer?: string;
            method?: string;
            cache?: RequestCache;
            credentials?: RequestCredentials;
            integrity?: string;
            keepalive?: boolean;
            mode?: RequestMode;
            redirect?: RequestRedirect;
            referrerPolicy?: ReferrerPolicy;
          }
      >;
      response: Response;
    }>;
    DELETE<P extends PathsWithMethod<Paths, 'delete'>>(
      url: P,
      init?: FetchOptions<FilterKeys<Paths[P], 'delete'>>
    ): Promise<{
      data: import('openapi-fetch').ParseAsResponse<
        import('openapi-typescript-helpers').SuccessResponse<
          import('openapi-typescript-helpers').ResponseObjectMap<
            Paths[P]['delete']
          >,
          `${string}/${string}`
        >,
        import('openapi-fetch').ParamsOption<FilterKeys<Paths[P], 'delete'>> &
          import('openapi-fetch').RequestBodyOption<
            FilterKeys<Paths[P], 'delete'>
          > & {
            baseUrl?: string;
            querySerializer?:
              | import('openapi-fetch').QuerySerializerOptions
              | import('openapi-fetch').QuerySerializer<
                  FilterKeys<Paths[P], 'delete'>
                >;
            bodySerializer?: import('openapi-fetch').BodySerializer<
              FilterKeys<Paths[P], 'delete'>
            >;
            parseAs?: import('openapi-fetch').ParseAs;
            fetch?: import('openapi-fetch').ClientOptions['fetch'];
            headers?: import('openapi-fetch').HeadersOptions;
          } & {
            headers:
              | [string, string][]
              | Headers
              | Record<
                  string,
                  string | number | boolean | (string | number | boolean)[]
                >
              | {
                  Cookie: string;
                  'X-XSRF-TOKEN': string;
                  'Content-Type': string;
                };
            signal?: AbortSignal | null;
            window?: null;
            priority?: RequestPriority;
            referrer?: string;
            method?: string;
            cache?: RequestCache;
            credentials?: RequestCredentials;
            integrity?: string;
            keepalive?: boolean;
            mode?: RequestMode;
            redirect?: RequestRedirect;
            referrerPolicy?: ReferrerPolicy;
          }
      >;
      response: Response;
    }>;
  };
  setBaseUrl(baseUrl: string): void;
  setCSRFToken(csrfToken: string | undefined): void;
  setCookies(cookies: string[] | undefined): void;
  setClientType(clientType: ClientType): void;
}
