export type SelectOption = {
  label: string;
  value: string;
};

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

export type FilterLanguageParams = FilterQueryParams & {
  name?: string
}

export type YearGroup = {
  id: string;
  name: string;
  position: string;
}

export type Author = {
  birthDate: string | null;
  country: string | null;
  id: string;
  link: string | null;
  name: string;
  picture: string | null;
};

type NameExtra = {
  link: string | null;
  name: string | null;
}

export type Language = {
  authors?: Author[];
  company: string | null;
  id: string;
  link: string | null;
  listed: boolean;
  name:string;
  nameExtra: NameExtra;
  predecessors?: Language[];
  yearConfirmed: boolean;
  yearGroup?: YearGroup;
  years: number[];
};

type PaginatedList = {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export type AuthorList = PaginatedList & {
  items: Author[];
};

export type AuthorListResponseData = HttpResponse<AuthorList>;

export type LanguageList = PaginatedList & {
  items: Language[];
};

export type LanguageListResponseData = HttpResponse<LanguageList>;

export type YearGroupResponseData = HttpResponse<YearGroup[]>;