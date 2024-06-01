import {DateTimeResolver} from 'graphql-scalars';
import prisma from '@/lib/prisma';
import {Player, PlayerHero, Resolvers} from '@/src/types';
import {heroes} from "@/app/domain/hero-definitions";
import {skills} from "@/app/domain/skill-definitions";
import {
    addHeroToPartySlot,
    getPlayerHeroes,
    getPlayerParty,
    removeHeroFromPartySlot
} from "@/app/api/graphql/transformers/player-hero-transformers";

export const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getPlayer: async (_, { id }): Promise<Player | null> => {
            return prisma.player.findUnique({
                where: {id}
            });
        },
        getAllHeroes: () => heroes,
        getAllSkills: () => skills,
        getPlayerHeroes: async (_, { playerId }): Promise<PlayerHero[]> => {
            return getPlayerHeroes(playerId);
        },
        getParty: async (_, { playerId }): Promise<PlayerHero[]> => {
            return getPlayerParty(playerId);
        }
    },
    Mutation: {
        createPlayer: async (_, { id }): Promise<Player> => {
            return prisma.player.create({
                data: {id}
            });
        },
        addPlayerHeroToParty: async (_, { playerId, playerHeroId, slot }): Promise<PlayerHero> => {
            return addHeroToPartySlot(playerId, playerHeroId, slot);
        },
        removePlayerHeroFromParty: async (_, { playerHeroId }): Promise<PlayerHero> => {
            return removeHeroFromPartySlot(playerHeroId);
        }
    }
};