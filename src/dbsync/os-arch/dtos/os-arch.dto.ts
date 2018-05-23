import { ArchitectureDto } from '../../architecture';
import { OperatingSystemDto } from '../../operating-system';

export interface OsArchDto {
    architecture: ArchitectureDto;
    operatingSystem: OperatingSystemDto;
    remoteImage: any;
}
