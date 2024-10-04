export declare const createError: (error: unknown, response?: Response) => void;
export declare const getRequestHeaders: (
  csrfToken?: string,
  cookies?: string[]
) => {
  Cookie: string;
  'X-XSRF-TOKEN': string;
  'Content-Type': string;
};
