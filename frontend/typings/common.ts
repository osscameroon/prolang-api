export type LoginInput = {
  email: string;
  password: string;
};

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

type HttpResponse<T> = {
  data: T;
};

export type LoginResponseData = HttpResponse<{
  expiresIn: string;
  token: string;
}>;

export type User = {
  id: string;
  email: string;
  name: null;
  role: UserRoleEnum;
};

export type UserResponseData = HttpResponse<User>;

export type BgColorVariants = 'primary' | 'red' | 'whiteGray';

export type DashboardSummary = {
  author: number;
  language: number;
  user: number;
  yearGroup: number;
};

export type DashboardSummaryData = HttpResponse<DashboardSummary>;
