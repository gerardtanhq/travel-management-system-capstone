import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import EntitiesList from '../EntitiesList.js';
import AddEntityForm from '../AddEntityForm.js';
import FilterEntitiesForm from '../FilterEntitiesForm.js';
import { addTravel, setTravels, updateTravel, deleteTravel, deleteSelectedTravels, toggleSelectedEntity } from '../features/travel/travelSlice.js';
import Navbar from '../Navbar.js';
import LoginForm from '../LoginForm';
import { API_URL } from '../config.js';
import EditTravelForm from '../EditTravelForm.js';

export default function HomePage() {
    const dispatch = useDispatch();

    const [editingTravel, setEditingTravel] = useState(null);

    const token = useSelector((state) => state.auth.token);
    const entities = useSelector((state) => state.travel.entities);
    const selectedCountries = useSelector((state) => state.travel.selectedCountries);
    const selectedEntities = useSelector((state) => state.travel.selectedEntities);

    useEffect(() => {
        const loadTravels = async () => {
            const response = await fetch(`${API_URL}/travel`);
            const data = await response.json();

            if (response.ok) {
                dispatch(setTravels(data));
            }
        };

        loadTravels();
    }, [dispatch]);

    const countries = [...new Set(entities.map((entity) => entity.country))];

    const filteredEntities =
        selectedCountries.length === 0
            ? entities
            : entities.filter((entity) => selectedCountries.includes(entity.country));

    const toTitleCase = (text) =>
        text
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const handleAdd = async (newTravel) => {
        const response = await fetch(
            `${API_URL}/travel`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: toTitleCase(newTravel.title),
                    description: newTravel.description,
                    price: Number(newTravel.price),
                    country: toTitleCase(newTravel.country),
                    travelPeriod: newTravel.travelPeriod,
                    imageURL: newTravel.imageURL,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Unable to add travel.');
            return;
        }

        const travelToAdd = {
            travelID: data.travelID,
            title: toTitleCase(newTravel.title),
            description: newTravel.description,
            price: Number(newTravel.price),
            country: toTitleCase(newTravel.country),
            travelPeriod: newTravel.travelPeriod,
            imageURL: newTravel.imageURL,
        };

        dispatch(addTravel(travelToAdd));
    };

    const handleDelete = (travelID) => dispatch(deleteTravel(travelID));

    const handleSelectEntity = (travelID) => dispatch(toggleSelectedEntity(travelID));

    const handleDeleteSelected = () => dispatch(deleteSelectedTravels());

    const handleEdit = (travel) => setEditingTravel(travel);

    const handleSaveEdit = async (updatedTravel) => {
        const response = await fetch(
            `${API_URL}/travel/${updatedTravel.travelID}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: toTitleCase(updatedTravel.title),
                    description: updatedTravel.description,
                    price: Number(updatedTravel.price),
                    country: toTitleCase(updatedTravel.country),
                    travelPeriod: updatedTravel.travelPeriod,
                    imageURL: updatedTravel.imageURL,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Unable to update travel.');
            return;
        }

        dispatch(updateTravel({
            ...updatedTravel,
            title: toTitleCase(updatedTravel.title),
            country: toTitleCase(updatedTravel.country),
            price: Number(updatedTravel.price),
        }));

        setEditingTravel(null);
    };

    return (
        <div className="app-container">
            <h1>SP Travel</h1>

            <Navbar />

            <LoginForm />

            {token && <AddEntityForm onAdd={handleAdd} />}

            {token && editingTravel && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <EditTravelForm
                            travel={editingTravel}
                            onSave={handleSaveEdit}
                            onCancel={() => setEditingTravel(null)}
                        />
                    </div>
                </div>
            )}

            <div className="content-layout">
                <FilterEntitiesForm
                    countries={countries}
                    selectedCountries={selectedCountries}
                    onDeleteSelected={handleDeleteSelected}
                />

                <EntitiesList
                    entities={filteredEntities}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isAdmin={Boolean(token)}
                    selectedEntities={selectedEntities}
                    onSelectEntity={handleSelectEntity}
                />
            </div>
        </div>
    );
}
