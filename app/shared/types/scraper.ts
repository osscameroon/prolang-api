export type LanguageInfo = {
  link: string | null;
  name: string;
  nameExtra: { link: string | null; name: string } | string | null;
};

export type AuthorInfo = {
  link: string | null;
  name: string;
};

export type ScraperResult = LanguageInfo & {
  authors: AuthorInfo[];
  place: string | null;
  predecessors: LanguageInfo[];
  yearConfirmed: boolean;
  yearGroup: string;
  years: number[];
};
