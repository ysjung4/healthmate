import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import FindHospital from './pages/FindHospital';
import MedicineFinder from './pages/MedicineFinder';
import Footer from './components/Footer';
import './App.css'; // ✅ 스타일 적용
import LiveWellTips from './pages/LiveWellTips';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/find-hospital" element={<FindHospital />} />
            <Route path="/medicine" element={<MedicineFinder />} />
            <Route path="/livewell" element={<LiveWellTips />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
