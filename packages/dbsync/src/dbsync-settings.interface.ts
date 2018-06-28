import { Interfaces } from '@lxdhub/common';
import { IDatabaseSettings } from '@lxdhub/db';

/**
 * The settings for the LXDHub Database synchronization
 * service
 */
export interface LXDHubDbSyncSettings {
    /**
     * The settings for lxd
     */
    lxd?: Interfaces.ILXDRemoteAuthentication;
    /**
     * The LXDHub config
     */
    lxdhubConfig: Interfaces.ILXDHubConfig;
    /**
     * The database settings
     */
    database: IDatabaseSettings;
}
