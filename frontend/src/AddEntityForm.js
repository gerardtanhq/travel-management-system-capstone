import { useState } from 'react';
import { AddEntityCategoryTestId, AddEntitySubmitTestId } from './testIds.js';

export default function AddEntityForm({ onAdd }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onAdd({
            name,
            category,
            price,
            description,
            image,
        });

        setName('');
        setCategory('');
        setPrice('');
        setDescription('');
        setImage('');

        event.target.reset();
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            setImage('');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(selectedFile);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Food</h2>

            <input
                type="text"
                placeholder="Food name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <input
                type="text"
                placeholder="category"
                data-testid={AddEntityCategoryTestId}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />

            <textarea
                placeholder="Food description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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