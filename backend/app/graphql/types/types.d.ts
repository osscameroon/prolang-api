import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { LanguageDocument, AuthorDocument, YearGroupDocument } from '../../shared/types/models';
import { AppContext } from './common';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  birthDate?: Maybe<Scalars['Date']>;
  country?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  languages: Array<Language>;
};


export type Language = {
  __typename?: 'Language';
  id: Scalars['ID'];
  authors: Array<Author>;
  company?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  listed: Scalars['Boolean'];
  longName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nameExtra?: Maybe<NameExtra>;
  predecessors: Array<Language>;
  successors: Array<Language>;
  yearConfirmed: Scalars['Boolean'];
  yearGroup: YearGroup;
  years: Array<Scalars['Int']>;
};

export type NameExtra = {
  __typename?: 'NameExtra';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type PaginatedAuthor = {
  __typename?: 'PaginatedAuthor';
  currentPage: Scalars['Int'];
  limit: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
  items: Array<Author>;
};

export type PaginatedLanguage = {
  __typename?: 'PaginatedLanguage';
  currentPage: Scalars['Int'];
  limit: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
  items: Array<Language>;
};

export type Query = {
  __typename?: 'Query';
  allYearGroups: Array<YearGroup>;
  oneYearGroup: YearGroup;
  allAuthors: Array<Author>;
  authors: PaginatedAuthor;
  oneAuthor: Author;
  allLanguages: Array<Language>;
  languages: PaginatedLanguage;
  oneLanguage: Language;
};


export type QueryOneYearGroupArgs = {
  idOrName: Scalars['ID'];
};


export type QueryAuthorsArgs = {
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
};


export type QueryOneAuthorArgs = {
  id: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  page?: Maybe<Scalars['Int']>;
  yearGroupName?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
};


export type QueryOneLanguageArgs = {
  id: Scalars['ID'];
};

export type YearGroup = {
  __typename?: 'YearGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['Int'];
  languageCount?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<AuthorDocument>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Language: ResolverTypeWrapper<LanguageDocument>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  NameExtra: ResolverTypeWrapper<NameExtra>;
  PaginatedAuthor: ResolverTypeWrapper<Omit<PaginatedAuthor, 'items'> & { items: Array<ResolversTypes['Author']> }>;
  PaginatedLanguage: ResolverTypeWrapper<Omit<PaginatedLanguage, 'items'> & { items: Array<ResolversTypes['Language']> }>;
  Query: ResolverTypeWrapper<{}>;
  YearGroup: ResolverTypeWrapper<YearGroupDocument>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: AuthorDocument;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Date: Scalars['Date'];
  Language: LanguageDocument;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  NameExtra: NameExtra;
  PaginatedAuthor: Omit<PaginatedAuthor, 'items'> & { items: Array<ResolversParentTypes['Author']> };
  PaginatedLanguage: Omit<PaginatedLanguage, 'items'> & { items: Array<ResolversParentTypes['Language']> };
  Query: {};
  YearGroup: YearGroupDocument;
};

export type AuthorResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LanguageResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  longName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameExtra?: Resolver<Maybe<ResolversTypes['NameExtra']>, ParentType, ContextType>;
  predecessors?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  successors?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  yearConfirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  yearGroup?: Resolver<ResolversTypes['YearGroup'], ParentType, ContextType>;
  years?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NameExtraResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['NameExtra'] = ResolversParentTypes['NameExtra']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedAuthorResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PaginatedAuthor'] = ResolversParentTypes['PaginatedAuthor']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedLanguageResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PaginatedLanguage'] = ResolversParentTypes['PaginatedLanguage']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allYearGroups?: Resolver<Array<ResolversTypes['YearGroup']>, ParentType, ContextType>;
  oneYearGroup?: Resolver<ResolversTypes['YearGroup'], ParentType, ContextType, RequireFields<QueryOneYearGroupArgs, 'idOrName'>>;
  allAuthors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  authors?: Resolver<ResolversTypes['PaginatedAuthor'], ParentType, ContextType, RequireFields<QueryAuthorsArgs, never>>;
  oneAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<QueryOneAuthorArgs, 'id'>>;
  allLanguages?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  languages?: Resolver<ResolversTypes['PaginatedLanguage'], ParentType, ContextType, RequireFields<QueryLanguagesArgs, never>>;
  oneLanguage?: Resolver<ResolversTypes['Language'], ParentType, ContextType, RequireFields<QueryOneLanguageArgs, 'id'>>;
};

export type YearGroupResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['YearGroup'] = ResolversParentTypes['YearGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  languageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  Author?: AuthorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  NameExtra?: NameExtraResolvers<ContextType>;
  PaginatedAuthor?: PaginatedAuthorResolvers<ContextType>;
  PaginatedLanguage?: PaginatedLanguageResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  YearGroup?: YearGroupResolvers<ContextType>;
};

