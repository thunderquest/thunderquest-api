import { DateTimeResolver } from 'graphql-scalars';
import prisma from '@/lib/prisma';
import { ErrorType, Resolvers } from '@/src/types';
import { withErrorHandling, createError } from './helpers';

export const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getPlayer: withErrorHandling(async (_, { id }) => {
            const player = await prisma.player.findUnique({
                where: { id }
            });
            if (!player) {
                return createError('Player not found', ErrorType.NotFound);
            }
            return {
                __typename: 'Player',
                ...player
            };
        })
    },
    Mutation: {
        createPlayer: withErrorHandling(async (_, { id }) => {
            const player = await prisma.player.create({
                data: { id }
            });
            return {
                __typename: 'Player',
                ...player
            };
        })
    }
};