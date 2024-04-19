import { DateTimeResolver } from 'graphql-scalars';
import prisma from '@/lib/prisma';
import { Resolvers } from '@/src/types';

export const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getPlayer: async (_, { id }) => {
            return prisma.player.findUnique({
                where: {id}
            });
        }
    },
    Mutation: {
        createPlayer: async (_, { id }) => {
            return prisma.player.create({
                data: {id}
            });
        }
    }
};
