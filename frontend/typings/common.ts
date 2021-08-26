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

export type PaginationChangeEventData = {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  totalRecords: number;
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

export type FilterQueryParams = {
  page: number;
  search?: string;
};

export type Author = {
  birthDate: string | null;
  country: string | null;
  id: string;
  link: string | null;
  name: string;
  picture: string | null;
};

export type AuthorList = {
  items: Author[];
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type AuthorListResponseData = HttpResponse<AuthorList>;
