import { useState } from 'react';
import { AddEntityCategoryTestId, AddEntitySubmitTestId } from './testIds.js';

export default function AddEntityForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [travelPeriod, setTravelPeriod] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onAdd({
            title,
            country,
            price,
            description,
            travelPeriod,
            imageURL,
        });

        setTitle('');
        setCountry('');
        setPrice('');
        setDescription('');
        setTravelPeriod('');
        setImageURL('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Travel</h2>

            <input
                type="text"
                placeholder="Travel title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <input
                type="text"
                placeholder="Country"
                data-testid={AddEntityCategoryTestId}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />

            <textarea
                placeholder="Travel description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <input
                type="text"
                placeholder="Travel period"
                value={travelPeriod}
                onChange={(event) => setTravelPeriod(event.target.value)}
            />

            <input
                type="text"
                placeholder="Image URL"
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
            />

            <button
                type="submit"
                data-testid={AddEntitySubmitTestId}
            >
                Add
            </button>
        </form>
    );
}