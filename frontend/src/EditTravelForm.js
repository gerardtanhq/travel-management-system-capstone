import { useState } from 'react';
import { getNames } from 'country-list';

export default function EditTravelForm({ travel, onSave, onCancel }) {
    const countries = getNames();

    const travelPeriodParts = travel.travelPeriod.split(' ');

    const [title, setTitle] = useState(travel.title);
    const [country, setCountry] = useState(travel.country);
    const [price, setPrice] = useState(travel.price);
    const [description, setDescription] = useState(travel.description);
    const [days, setDays] = useState(travelPeriodParts[0]);
    const [nights, setNights] = useState(travelPeriodParts[2]);
    const [imageURL, setImageURL] = useState(travel.imageURL);

    const handleSubmit = (event) => {
        event.preventDefault();

        onSave({
            travelID: travel.travelID,
            title,
            country,
            price: Number(price),
            description,
            travelPeriod: `${days} Days ${nights} Nights`,
            imageURL,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Travel</h2>

            <input
                type="text"
                placeholder="Travel title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
            />

            <input
                type="text"
                list="edit-countries"
                placeholder="Country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
            />

            <datalist id="edit-countries">
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

            <div className="edit-form-actions">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>

                <button type="submit">
                    Save Changes
                </button>
            </div>
        </form>
    );
}