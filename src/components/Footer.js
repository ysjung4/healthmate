import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-overlay" />
      <div className="footer-content">
        <p>
          © 2025 <strong>Yeonseo Jung</strong>. Built using the{' '}
          <a
            href="https://digital.nhs.uk/developer/api-catalogue/nhs-website-content"
            target="_blank"
            rel="noopener noreferrer"
          >
            NHS Website Content API.
          </a>
          
        </p>
        <p>App logo generated with ChatGPT and adapted by YeonSeo Jung.</p> 
      </div>
    </footer>
  );
}

export default Footer;
