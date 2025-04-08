import React, { useEffect, useState } from 'react';

const InstallPromptButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(true); // 👉 일단 무조건 true로

  useEffect(() => {
    const handler = (e) => {
      console.log('📦 beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ App installed');
        } else {
          console.log('❌ User dismissed install');
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    } else {
      alert('The app installation is not available yet in your browser.');
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        background: 'none',
        border: 'none',
        color: '#444',
        fontWeight: 500,
        fontSize: '1rem',
        cursor: 'pointer',
        paddingBottom: '4px',
        transition: 'color 0.3s, border-bottom 0.3s',
        borderBottom: '2px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#3e7699';
        e.currentTarget.style.borderBottom = '2px solid #3e7699';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#444';
        e.currentTarget.style.borderBottom = '2px solid transparent';
      }}
    >
      Install App
    </button>
  );
  
};

export default InstallPromptButton;
