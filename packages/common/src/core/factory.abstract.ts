/**
 * A factory which can transform a source entity
 * to a desintation entity
 */
export abstract class Factory<Desintation> {
    /**
     * Transforms one entity to a desination entity
     * @param source The source item which should be converted to a desination entity
     */
    abstract entityToDto(source: any): Desintation;

    /**
     * Transforms multiple entities to desination entites
     * @param source The source items which should be converted to desination entites
     */
    public entitiesToDto(source: any[]): Desintation[] {
        return source.map(sourceItem => this.entityToDto(sourceItem));
    }
}
