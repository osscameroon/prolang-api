export type LanguageInfo = {
  name: string;
  nameExtra: { name: string; link: string | null } | string | null;
  link: string | null;
};

export type AuthorInfo = {
  name: string;
  link: string | null;
};

export type ScraperResult = LanguageInfo & {
  authors: AuthorInfo[];
  place: string | null;
  predecessors: LanguageInfo[];
  years: number[];
  yearConfirmed: boolean;
  yearGroup: string;
};
