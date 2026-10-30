
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InternshipList from './components/InternshipList';
import InternshipDetails from './components/InternshipDetails';

import './App.css';

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<InternshipList />}
                />

                <Route
                    path="/internships/:id"
                    element={<InternshipDetails />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
