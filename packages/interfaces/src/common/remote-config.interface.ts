/**
 * Represents a remote
 */
export interface IRemoteConfig {
    /**
     * The name of the remote
     */
    name: string;
    /**
     * The url of the remote (with port an protocol)
     */
    url: string;
    /**
     * The protocol
     */
    protocol: 'lxd' | 'simplestreams';
    /**
     * If the remote is public
     */
    public: boolean;
    /**
     * If the remote is readonly
     */
    readonly: boolean;
    /**
     * The password of the remote
     */
    password: string;
}
