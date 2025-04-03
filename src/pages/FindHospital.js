import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import greenMarker from '../assets/green-marker.png';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function FindHospital() {
  const [visibleMap, setVisibleMap] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState({
    name: 'Central London',
    latitude: 51.5074,
    longitude: -0.1278,
  });
  const [center, setCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [button, setButton] = useState('Show Map');

  const regions = [
    { name: 'Central London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Westminster', latitude: 51.4975, longitude: -0.1357 },
    { name: 'Kensington', latitude: 51.4991, longitude: -0.1938 },
    { name: 'Chelsea', latitude: 51.4875, longitude: -0.1681 },
    { name: 'Camden', latitude: 51.5423, longitude: -0.1396 },
    { name: 'Islington', latitude: 51.5465, longitude: -0.1058 },
    { name: 'Hackney', latitude: 51.5432, longitude: -0.0701 },
    { name: 'Tower Hamlets', latitude: 51.5203, longitude: -0.0293 },
    { name: 'Greenwich', latitude: 51.4839, longitude: 0.0024 },
    { name: 'Southwark', latitude: 51.5035, longitude: -0.0804 },
    { name: 'Lambeth', latitude: 51.4607, longitude: -0.1163 },
    { name: 'Wandsworth', latitude: 51.4561, longitude: -0.1818 },
    { name: 'Hammersmith', latitude: 51.4927, longitude: -0.2339 },
    { name: 'Fulham', latitude: 51.479, longitude: -0.1972 },
    { name: 'Brent', latitude: 51.5588, longitude: -0.2817 },
    { name: 'Ealing', latitude: 51.5127, longitude: -0.305 },
    { name: 'Hounslow', latitude: 51.4686, longitude: -0.3613 },
    { name: 'Richmond', latitude: 51.4613, longitude: -0.3037 },
    { name: 'Kingston', latitude: 51.4123, longitude: -0.3007 },
  ];

  const goToMap = () => {
    setVisibleMap(!visibleMap);
    setButton(visibleMap ? 'Show Map' : 'Show List');
  };

  const fetchHospitals = async (latitude, longitude) => {
    try {
      const data = {
        orderby: `geo.distance(Geocode, geography'POINT(${longitude} ${latitude})')`,
        top: 25,
        skip: 0,
        count: true,
      };
      const response = await axios.post(
        'https://api.nhs.uk/service-search/search?api-version=1',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'subscription-key': 'c5a0520994db4c0ebfe7e4a29fcaba6c',
          },
        }
      );
      setHospitals(response.data.value);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const searchByRegion = (e) => {
    const region = regions.find((r) => r.name === e.target.value);
    if (region) {
      setSelectedRegion(region);
      setCenter({ lat: region.latitude, lng: region.longitude });
      fetchHospitals(region.latitude, region.longitude);
    }
  };

  useEffect(() => {
    fetchHospitals(center.lat, center.lng);
  }, [center.lat, center.lng]);

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const mapOptions = {
    styles: [
      {
        featureType: 'poi.medical',
        elementType: 'geometry',
        stylers: [{ color: '#d0f0dc' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ecf5f1' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#c6edea' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f5fbf6' }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true
  };

  const customIcon = {
    url: greenMarker,
    scaledSize: { width: 40, height: 40 }
  };

  return (
    <div className="hospitalbody">
   <div className="hospital-header-section">
  <div className="image-wrapper">
    <img
      src={require('../assets/hospital.png')}
      alt="Hospital Illustration"
      className="hospital-illustration"
    />
    <span className="image-copyright">© Designed by Freepik</span>
  </div>

  <div className="hospital-content-section">
    <h2 className="title">🏥 NHS Hospitals</h2>
    <p className="intro-text">Find hospitals in your area and view contact information.</p>
  </div>
</div>


<div className="hospital-controls">
      <select
        value={selectedRegion.name}
        onChange={searchByRegion}
        className="select-region"
      >
        <option disabled value="Central London">
          Central London
        </option>
        {regions.map((region, index) => (
          <option key={index} value={region.name} className="region-option">
            {region.name}
          </option>
        ))}
      </select>
      <button onClick={goToMap} className="toggle-button">
        {button}
      </button>
      </div>

      {!visibleMap && (
        <ul className="hospital-list">
          {hospitals.map((hospital, index) => (
            <li key={index} className="hospital-item">
              <div className="hospital-info">
                <h2 className="hospital-name">
                  <i className="fas fa-clinic-medical icon-style"></i>
                  {hospital.OrganisationName}
                </h2>
                <p className="hospital-address">
                  {hospital.Address1}, {hospital.City}, {hospital.Postcode}
                </p>
                {(() => {
                  try {
                    const contacts = JSON.parse(hospital.Contacts);
                    return Array.isArray(contacts)
                      ? contacts.map((contact, cIdx) => (
                          <span key={cIdx}>
                            {contact.OrganisationContactMethodType === 'Telephone' && (
                              <>Contact: {contact.OrganisationContactValue}</>
                            )}
                          </span>
                        ))
                      : null;
                  } catch (err) {
                    return null;
                  }
                })()}
              </div>
            </li>
          ))}
        </ul>
      )}

      {visibleMap && (
        <LoadScript googleMapsApiKey="AIzaSyADeVeLwOM_pIHJf5p19_-fNc7U9_UInWw">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={mapOptions}
          >
            {hospitals.map((hos, idx) => (
              hos.Latitude && hos.Longitude && (
                <Marker
                  key={idx}
                  position={{
                    lat: parseFloat(hos.Latitude),
                    lng: parseFloat(hos.Longitude)
                  }}
                  icon={customIcon}
                />
              )
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default FindHospital;
