import { ILXDHubService } from '.';

/**
 * Represents a microservice, which LXDHub offers
 */
export interface ILXDHubHttpService extends ILXDHubService {
    /**
     * Bootstraps the application and returns the express
     * instance
     */
    bootstrap(): Promise<any>;
}
