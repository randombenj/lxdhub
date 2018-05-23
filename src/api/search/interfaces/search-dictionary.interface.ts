/**
 * A dictionary which is used
 * to translate a query string
 * into a search-literal
 */
export interface SearchDictionary {
    /**
     * The aliases the search dictonary can have
     */
    aliases: string[];
    /**
     * The key, which value will be set in the  SearchLiteral
     */
    searchLiteralKey: string;
}
