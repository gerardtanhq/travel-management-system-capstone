import Navbar from '../Navbar.js';
import { FaUtensils, FaBullseye, FaClock } from 'react-icons/fa';

export default function AboutPage() {
    return (
        <div className="app-container">
            <h1>About Our Restaurant</h1>

            <Navbar />

            <div className="about-card">
                <h2>Welcome to Our Restaurant</h2>

                <p>
                    We serve a variety of delicious main courses, refreshing drinks and desserts prepared with quality
                    ingredients.
                </p>

                <div className="about-sections">
                    <div className="about-section">
                        <h3>
                            <FaUtensils className="about-icon" />
                            Our Food
                        </h3>
                        <p>Our menu offers comforting local favourites, drinks and desserts for different tastes.</p>
                    </div>

                    <div className="about-section">
                        <h3>
                            <FaBullseye className="about-icon" />
                            Our Goal
                        </h3>
                        <p>We aim to provide enjoyable meals, friendly service and a pleasant dining experience.</p>
                    </div>

                    <div className="about-section">
                        <h3>
                            <FaClock className="about-icon" />
                            Opening Hours
                        </h3>
                        <p>Monday to Sunday</p>
                        <p>10:00 AM to 10:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
