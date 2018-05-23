import * as Path from 'path';

export type PathType = typeof Path;

/**
 * The Path provider, which encapsulates
 * the Path package into a injectable
 * module
 */
export const PathProvider = {
    provide: 'Path',
    useFactory: () => Path
};
