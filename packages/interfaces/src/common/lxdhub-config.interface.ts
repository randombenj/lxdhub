import { IRemoteConfig } from './';

/**
 * The interface for the LXDHub settings file
 */
export interface ILXDHubConfig {
    /**
     * The configured remotes
     */
    remotes: IRemoteConfig[];
}
