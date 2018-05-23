import { SearchLiteral } from '../../search';

/**
 * The options which can be used
 * when searching an image
 */
export interface ImageSearchLiteral extends SearchLiteral {
    arch?: string;
    desc?: string;
    fingerprint?: string;
    version?: string;
    distribution?: string;
    release?: string;
}
