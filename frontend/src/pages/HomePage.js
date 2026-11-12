import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import EntitiesList from '../EntitiesList.js';
import AddEntityForm from '../AddEntityForm.js';
import FilterEntitiesForm from '../FilterEntitiesForm.js';
import { addTravel, setTravels, updateTravel, deleteTravel, toggleSelectedEntity } from '../features/travel/travelSlice.js';
import Navbar from '../Navbar.js';
import LoginForm from '../LoginForm';
import { API_URL } from '../config.js';
import EditTravelForm from '../EditTravelForm.js';

export default function HomePage() {
    const dispatch = useDispatch();

    const [editingTravel, setEditingTravel] = useState(null);
    const [deletingTravelID, setDeletingTravelID] = useState(null);
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
    const [bulkDeleteCount, setBulkDeleteCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);

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

    const handleDelete = (travelID) => setDeletingTravelID(travelID);

    const confirmDelete = async () => {
      if (isDeleting) return;

      setIsDeleting(true);

      try {
        const response = await fetch(`${API_URL}/travel/${deletingTravelID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert("Unable to delete travel listing.");
          return;
        }

        dispatch(deleteTravel(deletingTravelID));
        setDeletingTravelID(null);
      } catch (error) {
        alert("Unable to connect to the server.");
      } finally {
        setIsDeleting(false);
      }
    };

    const handleDeleteSelected = () => {
      if (selectedEntities.length > 0) {
        setBulkDeleteCount(selectedEntities.length);
        setShowBulkDeleteModal(true);
      }
    };

    const confirmBulkDelete = async () => {
      if (isBulkDeleting) return;

      setIsBulkDeleting(true);

      let failed = 0;
      const travelIDs = [...selectedEntities];

      for (const travelID of travelIDs) {
        try {
          const response = await fetch(`${API_URL}/travel/${travelID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            dispatch(deleteTravel(travelID));
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
        }
      }

      setIsBulkDeleting(false);
      setShowBulkDeleteModal(false);

      if (failed > 0) {
        alert(`${failed} travel listing(s) could not be deleted.`);
      }
    };

    const handleSelectEntity = (travelID) => dispatch(toggleSelectedEntity(travelID));

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

        {token && deletingTravelID !== null && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <h2>Delete Travel Listing</h2>

              <p>Are you sure you want to delete this listing?</p>
              <p>This action cannot be undone.</p>

              <div className="delete-modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setDeletingTravelID(null)}
                  disabled={isDeleting}
                >
                  No
                </button>

                <button onClick={confirmDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {token && showBulkDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <h2>Delete Selected Travel Listings</h2>

              <p>
                Are you sure you want to delete the selected travel listings?
              </p>
              <p>Selected listings: {bulkDeleteCount}</p>
              <p>This action cannot be undone.</p>

              <div className="delete-modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowBulkDeleteModal(false)}
                  disabled={isBulkDeleting}
                >
                  No
                </button>
                <button onClick={confirmBulkDelete} disabled={isBulkDeleting}>
                  {isBulkDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

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
            isAdmin={Boolean(token)}
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
