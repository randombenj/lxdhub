import { SearchDictionary } from '../search';

/**
 * A dictionar<, which will be used to translate
 * a query string into a SearchLiteral.
 */
export const ImageSearchDictionary: SearchDictionary[] = [
    {
        aliases: [
            'os',
            'operatingsystem',
            'dist',
            'distribution'
        ],
        searchLiteralKey: 'distribution'
    },
    {
        aliases: [
            'arch',
            'architecture'
        ],
        searchLiteralKey: 'arch'
    },
    {
        aliases: [
            'fingerprint',
            'fing'
        ],
        searchLiteralKey: 'fingerprint'
    },
    {
        aliases: [
            'description',
            'desc'
        ],
        searchLiteralKey: 'desc'
    },
    {
        aliases: [
            'version',
            'vers'
        ],
        searchLiteralKey: 'version'
    },
    {
        aliases: [
            'rel',
            'release'
        ],
        searchLiteralKey: 'release'
    }
];

/**
 * The provider for the ImageSearchDictonary-constant
 */
export const ImageSearchDictionaryProvider = {
    provide: 'ImageSearchDictionary',
    useFactory: () => ImageSearchDictionary,
};
