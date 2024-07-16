import {DateTimeResolver} from 'graphql-scalars';
import prisma from '@/lib/prisma';
import {Player, Resolvers} from '@/src/types';

export const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getPlayer: async (_, { id }): Promise<Player | null> => {
            return prisma.player.findUnique({
                where: {id}
            });
        }
    },
    Mutation: {
        createPlayer: async (_, { id }): Promise<Player> => {
            return prisma.player.create({
                data: {id}
            });
        }
    }
};