import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PM1Dot0 from './pages/individual/PM1Dot0';
import NDVI from './pages/individual/NDVI';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PM1Dot0" element={<PM1Dot0 />} />
          <Route path="/ndvi" element={<NDVI />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
