import { FilterCategoryTestId, DeleteSelectedTestId } from './testIds.js';
import { useDispatch } from 'react-redux';
import { toggleCategory } from './features/foods/foodsSlice.js';

export default function FilterEntitiesForm({
    categories,
    selectedCategories,
    onDeleteSelected
}) {
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Filter Categories</h2>

            <div className="filter-options">
                {categories.map((category) => {
                    return (
                        <label key={category}>
                            <input
                                type="checkbox"
                                data-testid={FilterCategoryTestId}
                                checked={selectedCategories.includes(category)}
                                onChange={() => dispatch(toggleCategory(category))}
                            />
                            {category}
                        </label>
                    );
                })}
            </div>
            <button 
                data-testid={DeleteSelectedTestId} 
                onClick={onDeleteSelected}
            >
                Delete Selected
            </button>
        </div>
    );
}
