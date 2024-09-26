import { AccountAPI } from './AccountAPI/index.js';
import { ApiService } from './ApiService/index.js';
import { GroupsAPI } from './GroupsAPI/index.js';

const baseUrl = 'https://api.awsdev.cosafe.se';

const apiService = new ApiService(baseUrl);
const accountsAPI = new AccountAPI(apiService);
const groupsAPI = new GroupsAPI(apiService);

const flow = async () => {
  await accountsAPI.getAntiForgeryToken();
  await accountsAPI.login({
    email: 'dev1@example.com',
    password: 'Cats-45678',
  });
  await accountsAPI.logout();
  // await groupsAPI.getGroupById({ id: 3448 });
  // await groupsAPI.getGroups({ limit: 2 });
  // await groupsAPI.getGroupMembers({ id: 3448}, { limit: 2 });
};

flow();
