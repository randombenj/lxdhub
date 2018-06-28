/**
 * Represents a microservice, which LXDHub offers
 */
export interface ILXDHubService {
    /**
     * Run the service
     */
    run(): Promise<any>;
}
