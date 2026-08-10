import { Link } from 'react-router-dom';
import { EntitySelectTestId, EntityDeleteTestId, EntityCategoryTestId } from './testIds.js';

export default function Entity({ entity, onDelete, onEdit, isAdmin, selectedEntities, onSelectEntity }) {
    return (
        <div className="entity-card">
            <div className="entity-row">
                <input
                    type="checkbox"
                    data-testid={EntitySelectTestId}
                    checked={selectedEntities.includes(entity.travelID)}
                    onChange={() => onSelectEntity(entity.travelID)}
                />

                <img src={entity.imageURL} alt={entity.title} className="entity-image" />

                <div className="entity-details">
                    <div className="entity-main">
                        <div>
                            <div className="entity-name">{entity.title}</div>

                            <div className="entity-category" data-testid={EntityCategoryTestId}>
                                {entity.country}
                            </div>
                        </div>

                        <div className="entity-price">${Number(entity.price).toFixed(2)}</div>
                    </div>

                    <div className="entity-footer">
                        <div className="entity-id">ID: {entity.travelID}</div>

                        <div className="entity-actions">
                            <Link className="details-button" to={`/travel/${entity.travelID}`}>
                                View Details
                            </Link>

                            {isAdmin && (
                                <button
                                    className="edit-button"
                                    onClick={() => onEdit(entity)}
                                >
                                    Edit
                                </button>
                            )}

                            <button data-testid={EntityDeleteTestId} onClick={() => onDelete(entity.travelID)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}