import { Error, ErrorType } from '@/src/types';
import { v4 as uuidv4 } from 'uuid';

export function createError(message: string, type: ErrorType): Error {
    const errorId = uuidv4();
    console.error(`Error ID: ${errorId}, Type: ${type}, Message: ${message}`);
    return { message, type, __typename: 'Error', errorId };
}

type ResolverFunction = (parent: any, args: any, context: any, info: any) => Promise<any>;

export function withErrorHandling(resolver: ResolverFunction): ResolverFunction {
    return async (parent, args, context, info) => {
        try {
            return await resolver(parent, args, context, info);
        } catch (err: any) {
            const errorMessage = err.message || 'An unexpected error occurred';
            return createError(errorMessage, ErrorType.ServerError);
        }
    };
}