import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar.js';

export default function TravelDetailsPage() {
    const { travelID } = useParams();

    const travel = useSelector(state =>
        state.travel.entities.find(entity => entity.travelID === Number(travelID))
    );

    if (!travel) {
        return (
            <div className="app-container">
                <h1>Travel Details Not Found</h1>
            </div>
        );
    }

    return (
        <div className="app-container">
            <h1>Travel Details</h1>
            <Navbar />

            <div className="travel-details-card">
                {travel.imageURL && <img src={travel.imageURL} alt={travel.title} className="travel-image" />}
                <p>
                    <strong>Travel Title:</strong> <span>{travel.title}</span>
                </p>
                <p>
                    <strong>Country:</strong> <span>{travel.country}</span>
                </p>
                <p>
                    <strong>Price:</strong> <span>${travel.price}</span>
                </p>
                <p>
                    <strong>Travel Period:</strong> <span>{travel.travelPeriod}</span>
                </p>
                <p>
                    <strong>Description:</strong> <span>{travel.description}</span>
                </p>
            </div>

            <Link className="primary-button" to="/">
                ← Back to Home
            </Link>
        </div>
    );
}