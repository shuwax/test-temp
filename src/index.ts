import { AccountAPI } from './AccountAPI/index.js';
import { OrganizationsAPI } from './OrganizationsAPI/index.js';
import { ApiService } from './ApiService/index.js';
import { UsersAPI } from './UsersAPI/index.js';
import { GroupsAPI } from './GroupsAPI/index.js';
import { AlarmsAPI } from './AlarmsAPI/index.js';
import { MessagesAPI } from './MessagesAPI/index.js';

export { ApiService } from './ApiService/index.js';
export { AccountAPI } from './AccountAPI/index.js';
export { GroupsAPI } from './GroupsAPI/index.js';
export { LocationsAPI } from './LocationsAPI/index.js';

const baseUrl = 'https://api.awsdev.cosafe.se';
const apiService = new ApiService(baseUrl);
const accountsAPI = new AccountAPI(apiService);
const alarmsAPI = new AlarmsAPI(apiService);
const groupsAPI = new GroupsAPI(apiService);
const usersAPI = new UsersAPI(apiService);
const organizationsAPI = new OrganizationsAPI(apiService);
const messagesAPI = new MessagesAPI(apiService);

const userCredentials = { email: 'dev1@example.com', password: 'Cats-45678' };
const flow = async () => {
  try {
    // if (user?.code) {
    //   user = await accountsAPI.loginAdminByEmailAndPassword({
    //     ...userCredentials,
    //     code: user.code,
    //   });
    // }
    //START Setup
    // 25165
    // const usersResponse = await usersAPI.getUsersByOrganizationsIds({
    //   organization: [25165],
    // });
    // await organizationsAPI.removeUserFromOrganization(
    //   25165,
    //   usersResponse.users[0].id
    // );
    //END Setup
    await organizationsAPI.deleteOrganization(25165);

    await accountsAPI.logout();
  } catch (error) {
    console.error(error);
  }
};

const setup = async () => {
  try {
    await accountsAPI.getAntiForgeryToken();
    const superAdminUser =
      await accountsAPI.loginAdminByEmailAndPassword(userCredentials);
    const organization = await organizationsAPI.createOrganization({
      name: 'E2E Test Organization',
      HasUserLimit: true,
      UserLimit: 10,
    });
    console.log(organization);
    const newUsers = await usersAPI.registerMultipleUsers(
      Array.from({ length: 3 }, (_, i) => ({
        name: `E2E Test User ${i + 1}`,
        email: `e2eTestUser${i + 1}@example.com`,
        organizationIDs: [organization.id],
        password: 'Test12345@',
      }))
    );

    const groups = await Promise.all(
      Array.from({ length: 3 }, (_, i) =>
        groupsAPI.registerGroup({
          name: `E2E Test Group ${i + 1}`,
          organizationID: organization.id,
          latitude: 56.162868,
          longitude: 15.586335,
        })
      )
    );
    const usersGroups = [];
    groups.forEach((group) => {
      newUsers.forEach((user) => {
        usersGroups.push({
          groupId: group.id,
          Id: user.id,
        });
      });
    });
    await groupsAPI.addMultipleGroupMembers(usersGroups);
  } catch (error) {
    console.error(error);
  }
};

const teardown = async (organizationId: number) => {
  try {
    await accountsAPI.getAntiForgeryToken();
    await accountsAPI.loginAdminByEmailAndPassword(userCredentials);

    await organizationsAPI.forceDeleteOrganization(organizationId);
    await accountsAPI.logout();
  } catch (error) {
    console.error(error);
  }
};

// await setup();
await teardown(25165);
