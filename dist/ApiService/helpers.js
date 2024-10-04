export const createError = (error, response) => {
    console.log('createError', error, response);
};
export const getRequestHeaders = (csrfToken, cookies) => {
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
//# sourceMappingURL=helpers.js.map