import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar.js';

export default function FoodDetailsPage() {
    const { id } = useParams();

    const food = useSelector(state =>
        state.foods.entities.find(entity => entity.id === id)
    );

    if (!food) {
        return (
            <div className="app-container">
                <h1>Food Not Found</h1>
            </div>
        );
    }

    return (
        <div className="app-container">
            <h1>Food Details</h1>
            <Navbar />

            <div className="food-details-card">
                {food.image && <img src={food.image} alt={food.name} className="food-image" />}
                <p>
                    <strong>Food Name:</strong> <span>{food.name}</span>
                </p>
                <p>
                    <strong>Category:</strong> <span>{food.category}</span>
                </p>
                <p>
                    <strong>Price:</strong> <span>${food.price}</span>
                </p>
                <p>
                    <strong>Description:</strong> <span>{food.description}</span>
                </p>
            </div>

            <Link className="primary-button" to="/">
                ← Back to Home
            </Link>
        </div>
    );
}