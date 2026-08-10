import { useDispatch, useSelector } from 'react-redux';
import EntitiesList from '../EntitiesList.js';
import AddEntityForm from '../AddEntityForm.js';
import FilterEntitiesForm from '../FilterEntitiesForm.js';
import { addFood, deleteFood, deleteSelectedFoods, toggleSelectedEntity } from '../features/foods/foodsSlice.js';
import Navbar from '../Navbar.js';

export default function HomePage() {
    const dispatch = useDispatch();

    const entities = useSelector((state) => state.foods.entities);
    const selectedCategories = useSelector((state) => state.foods.selectedCategories);
    const selectedEntities = useSelector((state) => state.foods.selectedEntities);

    const categories = [...new Set(entities.map((entity) => entity.category))];

    const filteredEntities =
        selectedCategories.length === 0
            ? entities
            : entities.filter((entity) => selectedCategories.includes(entity.category));

    const generateId = () => Math.random().toString(36).substring(2, 12).toUpperCase();

    const toTitleCase = (text) =>
        text
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const handleAdd = (newFood) => {
        const foodToAdd = {
            id: generateId(),
            name: toTitleCase(newFood.name),
            category: toTitleCase(newFood.category),
            price: Number(newFood.price),
            description: newFood.description,
            image: newFood.image,
        };

        dispatch(addFood(foodToAdd));
    };

    const handleDelete = (id) => dispatch(deleteFood(id));

    const handleSelectEntity = (id) => dispatch(toggleSelectedEntity(id));

    const handleDeleteSelected = () => dispatch(deleteSelectedFoods());

    return (
        <div className="app-container">
            <h1>Restaurant Management System</h1>

            <Navbar />

            <AddEntityForm onAdd={handleAdd} />

            <div className="content-layout">
                <FilterEntitiesForm
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onDeleteSelected={handleDeleteSelected}
                />

                <EntitiesList
                    entities={filteredEntities}
                    onDelete={handleDelete}
                    selectedEntities={selectedEntities}
                    onSelectEntity={handleSelectEntity}
                />
            </div>
        </div>
    );
}
