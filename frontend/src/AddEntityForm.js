import { useState } from 'react';
import { AddEntityCategoryTestId, AddEntitySubmitTestId } from './testIds.js';
import { getNames } from 'country-list';

export default function AddEntityForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [days, setDays] = useState('');
    const [nights, setNights] = useState('');
    const [imageURL, setImageURL] = useState('');
    const countries = getNames();

    const handleSubmit = (event) => {
        event.preventDefault();

        onAdd({
            title,
            country,
            price,
            description,
            travelPeriod: `${days} Days ${nights} Nights`,
            imageURL,
        });

        setTitle('');
        setCountry('');
        setPrice('');
        setDescription('');
        setDays('');
        setNights('');
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
                required
            />

            <input
                type="text"
                placeholder="Country"
                list="countries"
                data-testid={AddEntityCategoryTestId}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
            />

            <datalist id="countries">
                {countries.map((countryName) => (
                    <option key={countryName} value={countryName} />
                ))}
            </datalist>

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
            />

            <textarea
                placeholder="Travel description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
            />

            <div className="travel-period-inputs">
                <input
                    type="number"
                    placeholder="Days"
                    min="1"
                    value={days}
                    onChange={(event) => setDays(event.target.value)}
                    required
                />

                <span> Days </span>

                <input
                    type="number"
                    placeholder="Nights"
                    min="0"
                    value={nights}
                    onChange={(event) => setNights(event.target.value)}
                    required
                />

                <span> Nights</span>
            </div>

            <input
                type="text"
                placeholder="Image URL"
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
                required
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