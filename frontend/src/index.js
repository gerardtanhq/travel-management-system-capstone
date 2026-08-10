import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store.js';

const domElement = document.getElementById('root');
const root = ReactDOM.createRoot(domElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
