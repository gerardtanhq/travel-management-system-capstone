import { useDispatch } from 'react-redux';
import { toggleCountry } from './features/travel/travelSlice.js';
import { FilterCategoryTestId, DeleteSelectedTestId } from './testIds.js';

export default function FilterEntitiesForm({ countries, selectedCountries, onDeleteSelected }) {
    const dispatch = useDispatch();

    return (
        <div className="filter-options">
            <h2>Filter Countries</h2>

            {countries.map((country) => (
                <label key={country}>
                    <input
                        type="checkbox"
                        data-testid={FilterCategoryTestId}
                        checked={selectedCountries.includes(country)}
                        onChange={() => dispatch(toggleCountry(country))}
                    />

                    {country}
                </label>
            ))}

            <button
                data-testid={DeleteSelectedTestId}
                onClick={onDeleteSelected}
            >
                Delete Selected
            </button>
        </div>
    );
}