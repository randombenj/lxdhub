/**
 * Represents the authentication bundle
 * for the LXD remote
 */
export interface ILXDRemoteAuthentication {
    /**
     * The certificate for the LXD remote
     */
    cert?: Buffer;
    /**
     * The key for the LXD remote
     */
    key?: Buffer;
}
