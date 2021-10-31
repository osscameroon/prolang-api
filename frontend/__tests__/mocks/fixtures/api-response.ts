import { DashboardSummary, LoginResponseData, UserResponseData, UserRoleEnum } from '@typings/common';

export const loginUserData: LoginResponseData['data'] = {
  expiresIn: new Date().getTime().toString(),
  token: 'jwt-token',
};

export const currentUserData: UserResponseData['data'] = {
  email: 'teco@email.com',
  id: '61277278c67cd37b99091281',
  name: 'Teco Gill',
  role: UserRoleEnum.ADMIN,
};

export const dashboardStatData: DashboardSummary = {
  author: 51,
  language: 24,
  user: 2,
  yearGroup: 11,
};
