import React from 'react';

const CheckSWStatus = () => {
  const checkServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        console.log('✅ Service Worker is REGISTERED.');
        navigator.serviceWorker.ready
          .then(() => {
            console.log('✅ Service Worker is READY and ACTIVE!');
          })
          .catch(() => {
            console.log('⚠️ Registered, but NOT ready.');
          });
      } else {
        console.log('❌ No Service Worker is registered.');
      }
    } else {
      console.log('❌ This browser does not support service workers.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        onClick={checkServiceWorker}
        style={{
          padding: '0.5rem 1.2rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
        }}
      >
        Check Service Worker Status
      </button>
    </div>
  );
};

export default CheckSWStatus;
