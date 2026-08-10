import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import TravelDetailsPage from './pages/TravelDetailsPage.js';
import AboutPage from './pages/AboutPage.js';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/travel/:travelID" element={<TravelDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}