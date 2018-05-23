import { IDatabaseSettings } from '@lxdhub/db';
import { ILXDRemoteAuthentication, ILXDHubConfig } from '@lxdhub/common';
import { RemoteDto } from './remote';

/**
 * The settings for the LXDHub Database synchronization
 * service
 */
export interface LXDHubDbSyncSettings {
    /**
     * The settings for lxd
     */
    lxd?: ILXDRemoteAuthentication;
    /**
     * The LXDHub config
     */
    lxdhubConfig: ILXDHubConfig;
    /**
     * The database settings
     */
    database: IDatabaseSettings;
}
