import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** Represents a hero in a battle with battle-specific information */
export type BattleHero = {
  __typename?: 'BattleHero';
  currentHealth: Scalars['Int']['output'];
  playerHero: PlayerHero;
};

/** Represents a hero with basic information */
export type Hero = {
  __typename?: 'Hero';
  attackPerLevel: Scalars['Int']['output'];
  baseAttack: Scalars['Int']['output'];
  baseDefense: Scalars['Int']['output'];
  baseHealth: Scalars['Int']['output'];
  baseMagic: Scalars['Int']['output'];
  baseMana: Scalars['Int']['output'];
  baseMovement: Scalars['Int']['output'];
  baseResistance: Scalars['Int']['output'];
  defensePerLevel: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  healthPerLevel: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  magicPerLevel: Scalars['Int']['output'];
  manaRegen: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  resistancePerLevel: Scalars['Int']['output'];
  skills: Array<Skill>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlayerHeroToParty: PlayerHero;
  createPlayer?: Maybe<Player>;
  removePlayerHeroFromParty: PlayerHero;
};


export type MutationAddPlayerHeroToPartyArgs = {
  playerHeroId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
  slot: Scalars['Int']['input'];
};


export type MutationCreatePlayerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePlayerHeroFromPartyArgs = {
  playerHeroId: Scalars['ID']['input'];
};

/** Standard Player Implementation made for every user */
export type Player = {
  __typename?: 'Player';
  activeBattleId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents a hero owned by a player with specific stats */
export type PlayerHero = {
  __typename?: 'PlayerHero';
  createdAt: Scalars['DateTime']['output'];
  hero: Hero;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  partySlot?: Maybe<Scalars['Int']['output']>;
  playerId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllHeroes: Array<Hero>;
  getAllSkills: Array<Skill>;
  getParty: Array<PlayerHero>;
  getPlayer?: Maybe<Player>;
  getPlayerHeroes: Array<PlayerHero>;
};


export type QueryGetPartyArgs = {
  playerId: Scalars['ID']['input'];
};


export type QueryGetPlayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPlayerHeroesArgs = {
  playerId: Scalars['ID']['input'];
};

/** Represents a skill that a hero can have */
export type Skill = {
  __typename?: 'Skill';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  BattleHero: ResolverTypeWrapper<BattleHero>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Hero: ResolverTypeWrapper<Hero>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  PlayerHero: ResolverTypeWrapper<PlayerHero>;
  Query: ResolverTypeWrapper<{}>;
  Skill: ResolverTypeWrapper<Skill>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BattleHero: BattleHero;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Hero: Hero;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Player: Player;
  PlayerHero: PlayerHero;
  Query: {};
  Skill: Skill;
  String: Scalars['String']['output'];
};

export type BattleHeroResolvers<ContextType = any, ParentType extends ResolversParentTypes['BattleHero'] = ResolversParentTypes['BattleHero']> = {
  currentHealth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerHero?: Resolver<ResolversTypes['PlayerHero'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type HeroResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hero'] = ResolversParentTypes['Hero']> = {
  attackPerLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseAttack?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseDefense?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseHealth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseMagic?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseMana?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseMovement?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baseResistance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  defensePerLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthPerLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  magicPerLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  manaRegen?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resistancePerLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPlayerHeroToParty?: Resolver<ResolversTypes['PlayerHero'], ParentType, ContextType, RequireFields<MutationAddPlayerHeroToPartyArgs, 'playerHeroId' | 'playerId' | 'slot'>>;
  createPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'id'>>;
  removePlayerHeroFromParty?: Resolver<ResolversTypes['PlayerHero'], ParentType, ContextType, RequireFields<MutationRemovePlayerHeroFromPartyArgs, 'playerHeroId'>>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  activeBattleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerHeroResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerHero'] = ResolversParentTypes['PlayerHero']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hero?: Resolver<ResolversTypes['Hero'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  partySlot?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  playerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllHeroes?: Resolver<Array<ResolversTypes['Hero']>, ParentType, ContextType>;
  getAllSkills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  getParty?: Resolver<Array<ResolversTypes['PlayerHero']>, ParentType, ContextType, RequireFields<QueryGetPartyArgs, 'playerId'>>;
  getPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryGetPlayerArgs, 'id'>>;
  getPlayerHeroes?: Resolver<Array<ResolversTypes['PlayerHero']>, ParentType, ContextType, RequireFields<QueryGetPlayerHeroesArgs, 'playerId'>>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BattleHero?: BattleHeroResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Hero?: HeroResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerHero?: PlayerHeroResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
};

