
/**
 * The ata transfer object for ImageDetailDto-Architecture
 */
export class ArchitectureDto {
    processorName: string;
    humanName: string;
}

/**
 * The ata transfer object for ImageDetailDto-Operating System
 */
export class OperatingSystemDto {
    version: string;
    release: string;
    distribution: string;
}

/**
 * The ata transfer object for ImageDetailDto-Aliases
 */
export class AliasDto {
    name: string;
    description: string;
}

export class RemoteImageAvailabilityDto {
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
export class ImageDetailDto {
    id: number;
    /**
     * The human readable fingerprint of the image (12 characters long)
     */
    fingerprint: string;
    /**
     * The full fingerprint of the image
     */
    fullFingerprint: string;
    uploadedAt: Date;
    createdAt: Date;
    description: string;
    size: { humanReadable: string, raw: number };
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
