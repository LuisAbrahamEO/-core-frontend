/**
 * Interfaz base para mappers que transforman datos entre el Backend (Entity/SnakeCase)
 * y el Frontend (DTO/CamelCase).
 */
export interface BaseMapper<Entity, DTO> {
  toDTO(entity: Entity): DTO;
  toEntity(dto: DTO): Entity;
}

/**
 * Función de utilidad para mapear arrays
 */
export const mapCollection = <E, D>(
  collection: E[],
  mapper: (item: E) => D
): D[] => {
  return collection.map(mapper);
};
