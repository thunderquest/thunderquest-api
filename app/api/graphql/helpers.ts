import { Error, ErrorType } from '@/src/types';
import { v4 as uuidv4 } from 'uuid';

export function createError(message: string, type: ErrorType, errorId: string): Error {
    return { message, type, __typename: 'Error', errorId };
}

type ResolverFunction = (parent: any, args: any, context: any, info: any) => Promise<any>;

export function withErrorHandling(resolver: ResolverFunction): ResolverFunction {
    return async (parent, args, context, info) => {
        try {
            return await resolver(parent, args, context, info);
        } catch (err: any) {
            const errorId = uuidv4();
            const errorMessage = err.message || 'An unexpected error occurred';
            const stack = err.stack || 'No stack trace available';

            console.error(`Error ID: ${errorId}, Type: ${ErrorType.ServerError}, Message: ${errorMessage}\nStack: ${stack}`);
            return createError(errorMessage, ErrorType.ServerError, errorId);
        }
    };
}