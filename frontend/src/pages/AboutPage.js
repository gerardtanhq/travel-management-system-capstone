import Navbar from '../Navbar.js';
import { FaPlane, FaBullseye, FaClock } from 'react-icons/fa';

export default function AboutPage() {
    return (
        <div className="app-container">
            <h1>About SP Travel</h1>

            <Navbar />

            <div className="about-card">
                <h2>Welcome to SP Travel</h2>

                <p>
                    We provide a variety of travel packages to different destinations with clear pricing and travel
                    information.
                </p>

                <div className="about-sections">
                    <div className="about-section">
                        <h3>
                            <FaPlane className="about-icon" />
                            Our Travel Packages
                        </h3>
                        <p>Our packages offer different destinations, travel periods and experiences for travellers.</p>
                    </div>

                    <div className="about-section">
                        <h3>
                            <FaBullseye className="about-icon" />
                            Our Goal
                        </h3>
                        <p>We aim to make travel planning simple by providing clear and useful package information.</p>
                    </div>

                    <div className="about-section">
                        <h3>
                            <FaClock className="about-icon" />
                            Service Hours
                        </h3>
                        <p>Monday to Sunday</p>
                        <p>10:00 AM to 10:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}