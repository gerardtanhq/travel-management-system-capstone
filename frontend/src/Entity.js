import { Link } from 'react-router-dom';
import { EntitySelectTestId, EntityDeleteTestId, EntityCategoryTestId } from './testIds.js';

export default function Entity({ entity, onDelete, selectedEntities, onSelectEntity }) {
    return (
        <div className="entity-card">
            <div className="entity-row">
                <input
                    type="checkbox"
                    data-testid={EntitySelectTestId}
                    checked={selectedEntities.includes(entity.id)}
                    onChange={() => onSelectEntity(entity.id)}
                />

                <img src={entity.image} alt={entity.name} className="entity-image" />

                <div className="entity-details">
                    <div className="entity-main">
                        <div>
                            <div className="entity-name">{entity.name}</div>

                            <div className="entity-category" data-testid={EntityCategoryTestId}>
                                {entity.category}
                            </div>
                        </div>

                        <div className="entity-price">${Number(entity.price).toFixed(2)}</div>
                    </div>

                    <div className="entity-footer">
                        <div className="entity-id">ID: {entity.id}</div>

                        <div className="entity-actions">
                            <Link className="details-button" to={`/food/${entity.id}`}>
                                View Details
                            </Link>

                            <button data-testid={EntityDeleteTestId} onClick={() => onDelete(entity.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
