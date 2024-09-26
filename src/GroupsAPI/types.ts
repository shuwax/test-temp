import { GroupType } from './enums.js';

export interface Group {
  municipality: string | null;
  county: string | null;
  groupType: GroupType;
  groupMembersCount: number;
  totalMessageCount: number;
  longitude: number;
  latitude: number;
  lastSentMessage: string | null;
  groupsInOrganization: string | null;
  personsInOrganization: string | null;
  admins: number | null;
  membersInGroup: string | null;
  locationID: number;
  memberEmergency: boolean;
  openCalendarWriteAccess: boolean;
  searchable: boolean;
  adminSetsInfo: boolean;
  member: boolean;
  admin: boolean;
  hidden: boolean;
  menuItems: string[];
  organizationID: number | null;
  organizationName: string | null;
  subOrganizationID: number | null;
  subOrganizationname: string | null;
  membersCount: number;
  description: string | null;
  imageFileName: string | null;
  contactPersonName: string | null;
  contactPersonEmailAddress: string | null;
  contactPersonPhoneNumber: string | null;
  id: number;
  name: string;
  created: string;
  GroupID: number;
  type: number;
  favorite: boolean;
  contactPersonTitle: string | null;
}

export interface GetGroupsQuery {
  search?: string;
  skip?: number;
  limit?: number;
  latitude?: number;
  longitude?: number;
  menuitem?: string;
  minGroupMembersCount?: number;
  member?: boolean;
}
