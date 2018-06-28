import { Interfaces } from '@lxdhub/common';
import { ApiModelProperty } from '@nestjs/swagger';

export class APILinks implements Interfaces.APILinks {
    /**
     * The homepage url of the package
     */
    @ApiModelProperty({ description: 'The homepage url of the package' })
    homepage: string;
    /**
     * The bug report url of the package
     */
    @ApiModelProperty({ description: 'The bug report url of the package' })
    bug_report: string;
    /**
     * The repository url of the package
     */
    @ApiModelProperty({ description: 'The repository url of the package' })
    repository: string;
    /**
     * The api documentation url
     */
    @ApiModelProperty({ description: ' The api documentation url' })
    docs: string;
}

export class APIDto implements Interfaces.APIDto {
    /**
     * The version of the API
     */
    @ApiModelProperty({ description: 'The version of the API' })
    api_version: string;
    /**
     * The version of the npm package of the running API
     */
    @ApiModelProperty({ description: 'The version of the npm package of the running API' })
    package_version: string;
    /**
     * The name of the npm package
     */
    @ApiModelProperty({ description: 'The name of the npm package' })
    name: string;
    /**
     * The description of the npm package
     */
    @ApiModelProperty({ description: 'The description of the npm package' })
    description: string;
    /**
     * Further links related to the API
     */
    @ApiModelProperty({ description: 'Further links related to the API' })
    _links: APILinks;
}
