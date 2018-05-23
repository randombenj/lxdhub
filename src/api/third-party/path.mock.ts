/**
 * The mocked class of the Path module
 */
export class PathMock {
    public join(...paths: string[]): string {
        return paths.join('');
    }
}
