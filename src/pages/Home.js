// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import bannerImage from '../assets/header.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
    <section className="home-hero">
  <div className="hero-image-wrapper">
    <img src={bannerImage} alt="Healthcare banner" className="hero-image" />
    <span className="image-copyright">© Illustration by Freepik</span>
  </div>
  <div className="hero-text">
    <h1>Welcome to HealthMate</h1>
    <p>Your smart companion for better healthcare decisions.</p>
  </div>
</section>




      <section className="features">
        <h2>What You Can Do</h2>
        <div className="card-container">
          <div
            className="feature-card"
            onClick={() => navigate('/symptoms')}
            style={{ cursor: 'pointer' }}
          >
            <h3>🩺 Symptom Checker</h3>
            <p>Get suggestions based on your symptoms and learn when to seek care.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/find-hospital')}
            style={{ cursor: 'pointer' }}
          >
            <h3>🏥 Find Hospitals</h3>
            <p>Locate nearby healthcare facilities with directions and contact info.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/medicine')}
            style={{ cursor: 'pointer' }}
          >
            <h3>💊 Medicine Finder</h3>
            <p>Search for medicine information, uses, and how to take them safely.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/livewell')}
            style={{ cursor: 'pointer' }}
          >
            <h3>🌿 Live Well Tips</h3>
            <p>Explore NHS lifestyle advice for healthier living.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
