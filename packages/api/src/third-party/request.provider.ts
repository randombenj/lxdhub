import * as Request from 'request-promise';

/**
 * The Request provider, which encapsulates
 * the Request package into a injectable
 * module
 */
export const RequestProvider = {
    provide: 'Request',
    useFactory: () => Request
};
