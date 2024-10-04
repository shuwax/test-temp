var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/ApiService/index.ts
import createOpenAPIClient from "openapi-fetch";
import * as qs from "qs";

// src/ApiService/helpers.ts
var createError = (error, response) => {
  console.log("createError", error, response);
};
var getRequestHeaders = (csrfToken, cookies) => {
  return __spreadValues(__spreadValues({
    "Content-Type": "application/json"
  }, !!csrfToken && { "X-XSRF-TOKEN": csrfToken }), (cookies == null ? void 0 : cookies.length) && {
    Cookie: `${cookies.join(";")}`
  });
};

// src/ApiService/index.ts
var emptyResponseStatuses = [200, 204];
var ApiService = class {
  constructor(baseUrl, clientType = 1 /* Web */) {
    this.openApiClient = void 0;
    this.csrfToken = void 0;
    this.cookies = void 0;
    this.baseUrl = baseUrl;
    this.clientType = clientType;
    this.openApiClient = this.createClient({ baseUrl });
  }
  makeRequest(_0) {
    return __async(this, arguments, function* ({
      method,
      path,
      options
    }) {
      var _a;
      try {
        const requestOptions = __spreadProps(__spreadValues({}, options), {
          headers: (_a = options == null ? void 0 : options.headers) != null ? _a : this.getRequestHeaders()
        });
        const res = yield this.openApiClient[method](path, __spreadValues({}, requestOptions));
        const { data, response, error } = res;
        if (error) {
          throw error;
        }
        return { data, response };
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
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
    return __spreadValues(__spreadValues({}, includeCsrfToken && this.csrfToken && { "X-XSRF-TOKEN": this.csrfToken }), includeCookies && this.cookies && {
      Cookie: `${this.cookies.join(";")}`
    });
  }
  createClient(clientOptions) {
    const options = {
      querySerializer: (query) => {
        return qs.stringify(query, { arrayFormat: "repeat" });
      }
    };
    const client = createOpenAPIClient(__spreadValues(__spreadValues({}, options), clientOptions));
    const csrfToken = () => this.csrfToken;
    const cookies = () => this.cookies;
    function addAuthorizationHeader(options2) {
      var _a2;
      const updatedHeaders = (_a2 = options2 == null ? void 0 : options2.headers) != null ? _a2 : getRequestHeaders(csrfToken(), cookies());
      return __spreadProps(__spreadValues({}, options2), {
        headers: updatedHeaders
      });
    }
    return {
      GET(url, init) {
        return __async(this, null, function* () {
          const { data, error, response } = yield client.GET(
            url,
            addAuthorizationHeader(init)
          );
          if (data || emptyResponseStatuses.includes(response == null ? void 0 : response.status)) {
            return { data, response };
          }
          throw createError(error, response);
        });
      },
      PUT(url, init) {
        return __async(this, null, function* () {
          const { data, error, response } = yield client.PUT(
            url,
            addAuthorizationHeader(init)
          );
          if (data || emptyResponseStatuses.includes(response == null ? void 0 : response.status)) {
            return { data, response };
          }
          throw createError(error, response);
        });
      },
      POST(url, init) {
        return __async(this, null, function* () {
          const { data, error, response } = yield client.POST(
            url,
            addAuthorizationHeader(init)
          );
          if (data || emptyResponseStatuses.includes(response == null ? void 0 : response.status)) {
            return { data, response };
          }
          throw createError(error, response);
        });
      },
      DELETE(url, init) {
        return __async(this, null, function* () {
          const { data, error, response } = yield client.DELETE(
            url,
            addAuthorizationHeader(init)
          );
          if (data || emptyResponseStatuses.includes(response == null ? void 0 : response.status)) {
            return { data, response };
          }
          throw createError(error, response);
        });
      }
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
};

// src/AccountAPI/index.ts
var AccountAPI = class {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.getAntiForgeryToken = () => __async(this, null, function* () {
      var _a;
      try {
        const { data, response } = yield this.apiService.getOpenApiClient().GET("/api/Account/AntiForgeryToken");
        const token = data.requestVerificationToken;
        const cookie = response.headers.get("set-cookie");
        if (!((_a = this.apiService.getCookies()) == null ? void 0 : _a.length)) {
          if (cookie) this.apiService.setCookies([cookie]);
        }
        if (token) this.apiService.setCSRFToken(token);
        return { token, cookie };
      } catch (error) {
        console.error("Error fetching AntiForgeryToken:", error);
        return error;
      }
    });
    this.loginByEmailAndPassword = (body) => __async(this, null, function* () {
      try {
        const { data, response } = yield this.apiService.getOpenApiClient().POST("/api/Account/Login", { body });
        const cookies = response.headers.get("set-cookie");
        this.apiService.setCookies([...this.apiService.getCookies(), cookies]);
        yield this.getAntiForgeryToken();
        console.log("Logged in");
        return data;
      } catch (error) {
        console.error("Error logging in:", error);
        return error;
      }
    });
    this.loginAdminByEmailAndPassword = (body) => __async(this, null, function* () {
      try {
        const bodyData = __spreadValues({}, body);
        if (!bodyData.language) bodyData.language = "en";
        const { data, response } = yield this.apiService.getOpenApiClient().POST("/api/Account/LoginAdmin", { body: bodyData });
        const dataObject = data;
        const code = dataObject == null ? void 0 : dataObject.code;
        if (code) {
          return this.loginAdminByEmailAndPassword(__spreadProps(__spreadValues({}, body), { code }));
        }
        const cookies = response.headers.get("set-cookie");
        this.apiService.setCookies([...this.apiService.getCookies(), cookies]);
        yield this.getAntiForgeryToken();
        console.log("Logged in");
        return data;
      } catch (error) {
        console.error("Error admin logging in:", error);
        return error;
      }
    });
    this.getUserInfo = () => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Account/Info");
        return data;
      } catch (error) {
        console.error("Error getting user info:", error);
        return error;
      }
    });
    this.logout = (query) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().POST("/api/Account/Logout", {
          params: { query }
        });
        this.apiService.setCookies([]);
        yield this.getAntiForgeryToken();
        console.log("Logout successful");
      } catch (error) {
        console.error("Error logging out:", error);
        return error;
      }
    });
    this.apiService = apiService;
  }
};

// src/GroupsAPI/index.ts
var GroupsAPI = class {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.registerGroup = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/Groups/Register", { body });
        return data;
      } catch (error) {
        console.error("Error registering group:", error);
        return error;
      }
    });
    this.addGroupMember = (id, body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/Groups/{id}/addMember", {
          params: { path: { id } },
          body
        });
        return data;
      } catch (error) {
        console.error("Error registering group:", error);
        return error;
      }
    });
    this.addMultipleGroupMembers = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/Groups/addMembers", {
          body
        });
        return data;
      } catch (error) {
        console.error("Error registering group:", error);
        return error;
      }
    });
    this.deleteGroup = (id) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/Groups/{id}/delete", {
          params: { path: { id } },
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error registering group:", error);
        return error;
      }
    });
    this.deleteMultipleGroups = (groupsIds) => __async(this, null, function* () {
      try {
        if (!groupsIds.length) return;
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/Groups", {
          body: groupsIds,
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error registering group:", error);
        return error;
      }
    });
    //We can use it also like this -> query?: QueryParameters<'/api/Groups', 'get'>
    this.getGroups = (query) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Groups", { params: { query } });
        return data;
      } catch (error) {
        console.error("Error fetching groups:", error);
        return error;
      }
    });
    this.getAdminPanelGroups = (query) => __async(this, null, function* () {
      var _a;
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Admin/Groups/All", { params: { query } });
        return (_a = data == null ? void 0 : data.groups) != null ? _a : [];
      } catch (error) {
        console.error("Error fetching groups:", error);
        return error;
      }
    });
    this.getGroupById = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Groups/{id}", { params: { path: { id } } });
        return data;
      } catch (error) {
        console.error("Error fetching group by id:", error);
        return error;
      }
    });
    //We can use it also like this -> query?: QueryParameters<'/api/Groups/{id}/members', 'get'>
    this.getGroupMembers = (id, query) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Groups/{id}/members", { params: { path: { id }, query } });
        return data;
      } catch (error) {
        console.error("Error fetching group members:", error);
        return error;
      }
    });
    this.getGroupLocations = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Groups/{id}/locations", { params: { path: { id } } });
        return data;
      } catch (error) {
        console.error("Error fetching group locations:", error);
        return error;
      }
    });
    this.apiService = apiService;
  }
};

// src/LocationsAPI/index.ts
var LocationsAPI = class {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.getLocations = () => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Locations");
        return data;
      } catch (error) {
        console.error("Error fetching locations:", error);
        return error;
      }
    });
    this.getLocationById = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Locations/{id}", { params: { path: { id } } });
        return data;
      } catch (error) {
        console.error("Error fetching location:", error);
        return error;
      }
    });
    this.createLocation = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Locations", { body });
        return data;
      } catch (error) {
        console.error("Error creating location:", error);
        return error;
      }
    });
    this.apiService = apiService;
  }
};

// src/AlarmsAPI/index.ts
var AlarmsAPI = class {
  constructor(apiService) {
    this.createEmergencyType = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/EmergencyTypes", {
          body
        });
        return data;
      } catch (error) {
        console.error("Error creating emergency type:", error);
        return error;
      }
    });
    this.getEmergencyTypes = () => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Account/EmergencyTypes");
        return data;
      } catch (error) {
        console.error("Error creating emergency type:", error);
        return error;
      }
    });
    this.getEmergencyTypesByOrganizationId = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Admin/Organizations/{id}/EmergencyTypes", {
          params: { path: { id } }
        });
        return data;
      } catch (error) {
        console.error("Error getting emergency types by organization:", error);
        return error;
      }
    });
    this.deleteMultipleEmergencyTypes = (emergencyTypesIds) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/EmergencyTypes", {
          body: emergencyTypesIds,
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error deleting emergency type:", error);
        return error;
      }
    });
    this.apiService = apiService;
  }
  setApiService(apiService) {
    this.apiService = apiService;
  }
};

// src/UsersAPI/index.ts
var UsersAPI = class {
  constructor(apiService) {
    this.registerUser = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/Users/Register", { body });
        return data;
      } catch (error) {
        console.error("Error registering user:", error);
        return error;
      }
    });
    this.changeUsersPassword = (id, body) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().POST("/api/Admin/Users/{id}/changePassword", {
          body,
          params: { path: { id } },
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error registering users:", error);
        return error;
      }
    });
    this.registerUserAndSetPassword = (body) => __async(this, null, function* () {
      try {
        const userData = yield this.registerUser(body);
        if (userData == null ? void 0 : userData.id) {
          yield this.changeUsersPassword(userData.id, {
            password: body.password
          });
        }
        return userData;
      } catch (error) {
        console.error("Error registering user and setting password:", error);
        return error;
      }
    });
    this.registerMultipleUsers = (users) => __async(this, null, function* () {
      try {
        const result = yield Promise.all(
          users.map((user) => this.registerUserAndSetPassword(user))
        );
        return result;
      } catch (error) {
        console.error("Error registering users:", error);
        return error;
      }
    });
    this.getUsers = (query) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Users", { params: { query } });
        return data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return error;
      }
    });
    this.getUserById = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Users/{id}", { params: { path: { id } } });
        return data;
      } catch (error) {
        console.error("Error fetching user by id:", error);
        return error;
      }
    });
    this.getAdminPanelUsers = (query) => __async(this, null, function* () {
      var _a;
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Admin/Users/accounts", { params: { query } });
        return (_a = data == null ? void 0 : data.users) != null ? _a : [];
      } catch (error) {
        console.error("Error fetching groups:", error);
        return error;
      }
    });
    this.deleteUser = (id, body) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/Users/{id}/delete", {
          body,
          params: { path: { id } },
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        return error;
      }
    });
    this.deleteMultipleUsers = (users) => __async(this, null, function* () {
      try {
        if (!users.length) return;
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/Users/delete", {
          body: users,
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error deleting users:", error);
        return error;
      }
    });
    this.apiService = apiService;
  }
  setApiService(apiService) {
    this.apiService = apiService;
  }
};

// src/OrganizationsAPI/index.ts
var OrganizationsAPI = class {
  constructor(apiService) {
    this.setApiService = (apiService) => {
      this.apiService = apiService;
    };
    this.getApiService = () => {
      return this.apiService;
    };
    this.createOrganization = (body) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().POST("/api/Admin/Organizations/Create", { body });
        return data;
      } catch (error) {
        console.error("Error creating organization:", error);
        return error;
      }
    });
    this.getOrganizationById = (id) => __async(this, null, function* () {
      try {
        const { data } = yield this.apiService.getOpenApiClient().GET("/api/Admin/Organizations/{id}", { params: { path: { id } } });
        return data;
      } catch (error) {
        console.error("Error creating organization:", error);
        return error;
      }
    });
    this.addUsersToOrganization = (id, usersIds) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().POST("/api/Admin/Organizations/{id}/AddUsers", {
          params: { path: { id } },
          body: usersIds,
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error adding users to organization:", error);
        return error;
      }
    });
    this.removeUserFromSubOrganization = (id, userId) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().POST("/api/Admin/Organizations/{id}/RemoveUser/{userId}", {
          params: { path: { id, userId } },
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error removing user from organization:", error);
        return error;
      }
    });
    this.removeMultipleUsersFromSubOrganization = (id, usersIds) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().POST("/api/Admin/Organizations/{id}/RemoveUsers", {
          params: { path: { id } },
          body: usersIds,
          parseAs: "text"
        });
      } catch (error) {
        console.error("Error removing users from organization:", error);
        return error;
      }
    });
    this.deleteOrganization = (id) => __async(this, null, function* () {
      try {
        yield this.apiService.getOpenApiClient().DELETE("/api/Admin/Organizations/{id}/Delete", {
          params: { path: { id } }
        });
      } catch (error) {
        console.error("Error deleteing organization:", error);
        return error;
      }
    });
    // TODO: Ask BE if I need to delete EmergencyTypes before deleting Organization
    /**
     * forceDeleteOrganization
     *
     * Completely removes an organization, including its associated groups, users, and emergency types.
     *
     * @param {string} organizationId - The ID of the organization to delete
     */
    this.forceDeleteOrganization = (id) => __async(this, null, function* () {
      try {
        const groupsAPI = new GroupsAPI(this.apiService);
        const usersAPI = new UsersAPI(this.apiService);
        const alarmsAPI = new AlarmsAPI(this.apiService);
        const organizationGroups = yield groupsAPI.getAdminPanelGroups({
          OrgId: id,
          IncludeSuborgs: true
        });
        const organizationUsers = yield usersAPI.getAdminPanelUsers({
          organization: [id],
          includeSuborgs: true
        });
        const organizationEmergencyTypes = yield alarmsAPI.getEmergencyTypesByOrganizationId(id);
        yield usersAPI.deleteMultipleUsers(
          organizationUsers.map((user) => ({ userId: user.id }))
        );
        yield groupsAPI.deleteMultipleGroups(
          organizationGroups.map((group) => group.id)
        );
        yield alarmsAPI.deleteMultipleEmergencyTypes(
          organizationEmergencyTypes.map((type) => type.ID)
        );
        yield this.deleteOrganization(id);
      } catch (error) {
        console.error("Error force deleting organization:", error);
      }
    });
    this.apiService = apiService;
  }
};
export {
  AccountAPI,
  AlarmsAPI,
  ApiService,
  GroupsAPI,
  LocationsAPI,
  OrganizationsAPI,
  UsersAPI
};
