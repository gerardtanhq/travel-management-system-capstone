import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import FoodDetailsPage from './pages/FoodDetailsPage.js';
import AboutPage from './pages/AboutPage.js';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/food/:id" element={<FoodDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}