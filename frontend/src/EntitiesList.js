import Entity from './Entity.js';
import { EntityTestId } from './testIds.js';

export default function EntitiesList({ entities, onDelete, onEdit, isAdmin, selectedEntities, onSelectEntity }) {
    return (
        <div>
            <div>
                {entities.map((entity) => {
                    return (
                        <div key={entity.travelID} data-testid={EntityTestId}>
                            <Entity
                                entity={entity}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                isAdmin={isAdmin}
                                selectedEntities={selectedEntities}
                                onSelectEntity={onSelectEntity}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
