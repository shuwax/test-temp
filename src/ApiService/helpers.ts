export const createError = (error: unknown, response?: Response) => {
  console.log('createError', error, response);
};

export const getRequestHeaders = (csrfToken?: string, cookies?: string[]) => {
  return {
    'Content-Type': 'application/json',
    ...(!!csrfToken && { 'X-XSRF-TOKEN': csrfToken }),
    ...(cookies?.length && {
      Cookie: `${cookies.join(';')}`,
    }),
  };
};
// .replace(`, coreAuth=`, '; coreAuth=')
// getRequestHeaders(includeCsrfToken = true, includeCookies = true) {
//     return {
//       ...(includeCsrfToken &&
//         this.csrfToken && { 'X-XSRF-TOKEN': this.csrfToken }),
//       ...(includeCookies &&
//         this.cookies && {
//           Cookie: `${this.cookies.join(';')}`,
//         }),
//     };
//   }
