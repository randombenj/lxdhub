export interface APILinks {
    /**
     * The homepage url of the package
     */
    homepage: string;
    /**
     * The bug report url of the package
     */
    bug_report: string;
    /**
     * The repository url of the package
     */
    repository: string;
    /**
     * The api documentation url
     */
    docs: string;
}

export interface APIDto {
    /**
     * The version of the API
     */
    api_version: string;
    /**
     * The version of the npm package of the running API
     */
    package_version: string;
    /**
     * The name of the npm package
     */
    name: string;
    /**
     * The description of the npm package
     */
    description: string;
    /**
     * Further links related to the API
     */
    _links: APILinks;
}

/**
 * This interface represents
 * options for iterating through
 * paginated lists.
 */
export interface PaginationOptionsDto {
    /**
     * The maximum amount of items to request.
     */
    limit: number;
    /**
     * The offset of the items
     */
    offset: number;
}

/**
 * The response wrapper around the requested
 * data, which will be used as response,
 * when requesting a paginated list.
 */
export interface PaginationResponseDto<ItemType> {
    /**
     * The requested data
     */
    results: ItemType;
    /**
     * The offset of the items
     */
    offset: number;
    /**
     * The maximum amount of items to request
     */
    limit: number;
    /**
     * The total amount of all items in the
     * list, without the given offset and
     * limit options.
     */
    total: number;
}

/**
 * The response wrapper around the requested
 * data, which will be used as response,
 * when requesting a paginated list.
 */
export interface ResponseDto<ItemType> {
    /**
     * The requested data
     */
    results: ItemType;
}

/**
 * The data transfer object,
 * which represents the response
 * when cloning an image
 */
export interface CloneImageResponseDto {
    /**
     * The operation uuid
     */
    uuid: string;
}

/**
 * The CloneImageDto represents the data
 * transfer object, which is used for defining
 * the options to clone an image
 */
export interface CloneImageDto {
    sourceRemoteId: number;
    destinationRemoteId: number;
}

/**
 * The CloneStatusDto represents the data
 * transfer object, which is used for requesting
 * the status of a clone operation
 */
export interface CloneStatusDto {
    destinationRemoteId: number;
    /**
     * The operation UUID from the LXD Server
     */
    operation: string;
    imageId: number;
}

/**
 * The ata transfer object for ImageDetailDto-Architecture
 */
export interface ArchitectureDto {
    processorName: string;
    humanName: string;
}

/**
 * The ata transfer object for ImageDetailDto-Operating System
 */
export interface OperatingSystemDto {
    version: string;
    release: string;
    distribution: string;
}

/**
 * The ata transfer object for ImageDetailDto-Aliases
 */
export interface AliasDto {
    name: string;
    description: string;
}

export interface RemoteImageAvailabilityDto {
    name: string;
    /**
     * Returns if the image is cloneable to this remote
     */
    cloneable: boolean;
    id: number;
    available: boolean;
}

/**
 * The data transfer object,
 * which represents a detailed
 * image item.
 */
export interface ImageDetailDto {
    id: number;
    fingerprint: string;
    uploadedAt: Date;
    createdAt: Date;
    description: string;
    size: number;
    label: string;
    serial: string;
    autoUpdate: boolean;
    expiresAt: Date;
    lastUsedAt: Date;
    architecture: ArchitectureDto;
    operatingSystem: OperatingSystemDto;
    aliases: AliasDto[];
    remotes: RemoteImageAvailabilityDto[];
    public: boolean;
    /**
     * If this image is cloneable
     */
    cloneable: boolean;
}

/**
 * The data transfer object,
 * which represents a "not detailed"
 * image item. This class is used for
 * larger image lists, which do not require
 * any detailed data of an image.
 */
export interface ImageListItemDto {
    id: number;
    fingerprint: string;
    uploadedAt: Date;
    description: string;
    _links: { detail: string; };
}

/**
 * This interface represents
 * options for request an image list.
 */
export interface ImageListOptions {
    /**
     * The id of the remote, from which the images should
     * be from. If none is given, take the first remote
     */
    remoteId: number;
    /**
     * The query-string which filters the image.
     * Search for image OS name or Arch Name
     */
    query: string;
}

/**
 * The log payload
 */
export interface LogDto {
    /**
     * The level of the log message
     */
    level: string;
    /**
     * The log message
     */
    message: string;
    /**
     * Additional object
     */
    additional: any;
}

/**
 * The source information of an image / remote
 */
export interface SourceDto {
    /**
     * The type of the source.
     * Default is image
     */
    type: string;
    /**
     * The mode of the clone.
     * Only pull is supported by LXC Rest API for now
     * pull is default
     */
    mode: string;
    /**
     * The remote server url of the image source (pull mode only)
     */
    server: string;
    /**
     * The protocol of the clone
     * Either lxd or simplestreams
     * Default is lxd
     */
    protocol: 'simplestreams' | 'lxd';
    /**
     * The remote sercret.
     * Pull mode only, private images only
     */
    secret: string;
    /**
     * The PEM certificate
     * If not mentioned, system certificate is used
     */
    certificate: string;
    /**
     * Fingerprint of the image
     * Must be set if alias is not.
     * A SHA256 string
     */
    fingerprint: string;
    /**
     * The alias of the image
     */
    alias: string;
}

/**
 * The source image properties
 */
export interface SourceImagePropertiesDto {
    os: string;
}

/**
 * The source image as defined in
 * https://github.com/lxc/lxd/blob/master/doc/rest-api.md#post-7
 */
export interface SourceImageDto {
    /**
     * The filename of the image
     * Used for export (optional)
     */
    filename: string;
    /**
     * Whether the image can be downloaded by untrusted users
     */
    public: boolean;
    /**
     * Image properties (optional, applied on top of source properties)
     */
    properties: SourceImagePropertiesDto;
    /**
     * Set initial aliases ("image_create_aliases" API extension)
     */
    aliases: AliasDto[];
    /**
     * The source, which defines the source
     * remote
     */
    source: SourceDto;
}

/**
 * The data transfer object
 * for remotes
 */
export interface RemoteDto {
    /**
     * The server url of the remote
     */
    serverUrl: string;
    /**
     * The protocol of the remote (e.g. 'lxd' or 'simplestreams')
     */
    protocol: string;
    /**
     * If the remote is readonly (no images can be pushed on)
     */
    readonly: boolean;
    /**
     * If the remote is set to public
     */
    public: boolean;
    /**
     * The display name of the remote
     */
    name: string;
    /**
     * The id of the remote
     */
    id: number;
}
