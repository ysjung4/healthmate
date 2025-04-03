import React, { useState } from 'react';
import '../App.css';

// 예시 약물 목록
const quickExamples = [
  'Paracetamol',
  'Ibuprofen',
  'Amoxicillin',
  'Omeprazole',
  'Cetirizine'
];

const allMedicines = [
  'Paracetamol for adults',
  'Ibuprofen for adults (Nurofen)',
  'Ibuprofen for children',
  'Amoxicillin',
  'Omeprazole',
  'Cetirizine',
  'Lisinopril',
  'Metformin',
  'Atorvastatin'
];

const relatedSlugs = [
  'ibuprofen-for-adults-nurofen',
  'ibuprofen-for-children',
  'paracetamol-for-adults'
];

const synonyms = {
  nurofen: 'ibuprofen-for-adults-nurofen',
  tylenol: 'paracetamol-for-adults',
  advil: 'ibuprofen-for-adults-nurofen',
  ibuprofen: 'ibuprofen-for-children', // 여기 변경
  paracetamol: 'paracetamol-for-adults'
};

const normalize = (input) => {
  const cleaned = input
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();

  const baseSlug = cleaned.replace(/\s+/g, '-');

  if (synonyms[cleaned]) return synonyms[cleaned];
  if (relatedSlugs.includes(baseSlug)) return baseSlug;

  const fallback = relatedSlugs.find(slug => slug.includes(baseSlug));
  if (fallback) return fallback;

  return baseSlug;
};

const MedicineFinder = () => {
  const [medicine, setMedicine] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchMedicineInfo = async (input) => {
    const query = normalize(input || medicine);
    if (!query) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`https://int.api.service.nhs.uk/nhs-website-content/medicines/${query}`, {
        headers: {
          Accept: 'application/json',
          apikey: 'iyZmOAnbHYj83h022khO4HSr7rfRpSme'
        }
      });

      if (!response.ok) throw new Error(`No data found (${response.status})`);

      const data = await response.json();
      const mainText = data?.hasPart?.map(p => p.hasPart?.map(x => x.text).join('\n')).join('\n\n');

      setResult({
        name: data.name,
        description: data.description,
        content: mainText
      });
    } catch (err) {
      setError('No medicine information found.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setMedicine(val);

    const matched = allMedicines.filter((med) =>
      med.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(matched);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchMedicineInfo();
  };

  const handleSuggestionClick = (value) => {
    setMedicine(value);
    setSuggestions([]);
    fetchMedicineInfo(value);
  };

  const handleQuickClick = (label) => {
    // Custom behavior for "Ibuprofen"
    if (label.toLowerCase() === 'ibuprofen') {
      setMedicine('Ibuprofen for children');
      fetchMedicineInfo('Ibuprofen for children');
    } else {
      setMedicine(label);
      fetchMedicineInfo(label);
    }
  };

  return (
    <div className="medicine-finder-container">
      <div className="image-section">
        <img src={require('../assets/58320.jpg')} alt="Medicine Finder" className="medicine-image" />
        <span className="image-copyright">© Designed by gstudioimagen / Freepik</span>
      </div>

      <div className="input-section">
        <h2 className="title">💊 Medicine Finder</h2>

        <div className="quick-buttons">
          {quickExamples.map((med) => (
            <button
              key={med}
              onClick={() => handleQuickClick(med)}
              className="quick-button"
            >
              {med}
            </button>
          ))}
        </div>

        <div className="search-bar">
          <input
            type="text"
            value={medicine}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter medicine name"
          />
          <button onClick={() => fetchMedicineInfo(medicine)}>Search</button>
        </div>

        {suggestions.length > 0 && (
          <ul className="suggestion-box">
            {suggestions.map((item) => (
              <li
                key={item}
                onClick={() => handleSuggestionClick(item)}
                className="suggestion-item"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {result && (
          <div className="medicine-result">
            <h3>{result.name}</h3>
            <p>{result.description}</p>
            <div dangerouslySetInnerHTML={{ __html: result.content }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineFinder;
