import React, { useState } from 'react';
import '../App.css';
import doctorIllustration from '../assets/3737510.jpg';

const synonymMap = {
  'back ache': 'back-pain',
  'lower back pain': 'back-pain',
  'head ache': 'headache',
  'tummy ache': 'stomach-ache',
  'feverish': 'fever',
  'cold': 'common-cold',
  'runny nose': 'common-cold',
  'sick': 'vomiting',
  'belly pain': 'abdominal-pain',
  'skin problem': 'acne',
  'spots': 'acne',
  'shortness of breath': 'asthma',
  'tiredness': 'fatigue',
  'backpain': 'back-pain',
  'headpain': 'headache',
  'tummypain': 'stomach-ache',
  'stomachpain': 'abdominal-pain'
};

function SymptomChecker() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkSymptom = async () => {
    if (!symptom.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let input = symptom.toLowerCase().trim().replace(/[\s/]+/g, '-');
      let slug = synonymMap[input] || input;

      const response = await fetch(`https://int.api.service.nhs.uk/nhs-website-content/conditions/${slug}`, {
        headers: {
          Accept: 'application/json',
          apikey: 'iyZmOAnbHYj83h022khO4HSr7rfRpSme'
        }
      });

      if (!response.ok) throw new Error(`Not found (${response.status})`);
      const data = await response.json();

      const description = data?.hasPart?.[0]?.hasPart?.[0]?.text || data?.description;
      const mainText = data?.hasPart?.map(part => part.hasPart?.map(el => el.text).join('\n')).join('\n\n');

      setResult({
        headline: data.headline || data.name,
        description,
        mainText
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('No information found for that condition.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkSymptom();
    }
  };

  return (
    <div className="medicine-finder-container">
  
  <div className="image-section">
    <img
      src={doctorIllustration}
      alt="Doctor Illustration"
      className="doctor-illustration"
    />
    <span className="image-copyright">© Designed by Freepik</span>
  </div>

  <div className="search-section">
    <h2 className="title">🩺 Symptom Checker</h2>
    <p className="intro-text">
      Enter your symptoms to get helpful information.<br />
      ex) lower back pain, feverish, skin problem
    </p>

          <div className="search-bar">
            <input
              type="text"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a symptom..."
            />
            <button onClick={checkSymptom}>Check</button>
          </div>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result-card">
          <h2>{result.headline || 'Symptom Details'}</h2>
          {result.description && (
            <div className="description scroll-box">
              <div dangerouslySetInnerHTML={{ __html: result.description }} />
            </div>
          )}
          {result.mainText && (
            <div className="text-content scroll-box" dangerouslySetInnerHTML={{ __html: result.mainText }} />
          )}
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;
