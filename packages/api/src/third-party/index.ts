/**
 * The third-party module is made
 * for easier test handling. Third party
 * libraries are usually no injectable through
 * NestJS. This module tries to bypass this.
 */
export * from './axios.provider';
export * from './fs.provider';
export * from './fs.mock';
export * from './path.provider';
export * from './path.mock';
