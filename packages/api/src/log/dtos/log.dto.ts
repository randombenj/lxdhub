import { ApiModelProperty } from '@nestjs/swagger';

/**
 * The log payload
 */
export class LogDto {
    /**
     * The level of the log message
     */
    @ApiModelProperty({ description: 'The level of the log message' })
    level: string;
    /**
     * The log message
     */
    @ApiModelProperty({ description: 'The log message' })
    message: string;
    /**
     * Additional object
     */
    @ApiModelProperty({ description: 'Additional object' })
    additional?: any;
}
