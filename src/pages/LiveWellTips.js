import React, { useEffect, useState } from 'react';
import '../App.css';
import { ChevronRight, HeartPulse, Apple, Moon, Dumbbell, Smile } from 'lucide-react';

function LiveWellTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const icons = [HeartPulse, Apple, Moon, Dumbbell, Smile];

  

  const getSummary = (headline) => {
    const lower = headline.toLowerCase();
    if (lower.includes('weight')) return 'Tips for maintaining a healthy weight.';
    if (lower.includes('exercise')) return 'Simple workouts and fitness guidance.';
    if (lower.includes('sleep')) return 'Advice to improve your sleep quality.';
    if (lower.includes('eat')) return 'How to build a balanced, nutritious diet.';
    if (lower.includes('alcohol')) return 'Reduce your alcohol intake effectively.';
    if (lower.includes('smoking')) return 'Support and steps to quit smoking.';
    if (lower.includes('addiction')) return 'Help and support for addiction recovery.';
    if (lower.includes('sexual')) return 'Info on safe and healthy sexual wellbeing.';
    if (lower.includes('bone')) return 'How to keep your bones strong and healthy.';
    if (lower.includes('pain')) return 'Effective pain management advice.';
    if (lower.includes('teeth')) return 'Healthy dental care tips for all ages.';
    if (lower.includes('seasonal')) return 'Stay well in changing seasons.';
    if (lower.includes('wash')) return 'Proper hand washing techniques.';
    if (lower.includes('child')) return 'When to keep your child home from school.';
    if (lower.includes('mental')) return '5 steps for better mental wellbeing.';
    if (lower.includes('bmi')) return 'Calculate and understand your BMI.';
    return null;
  };

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('https://int.api.service.nhs.uk/nhs-website-content/live-well', {
          headers: {
            Accept: 'application/json',
            apikey: 'iyZmOAnbHYj83h022khO4HSr7rfRpSme'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        console.log('✅ Full API response:', data);

        const allItems = data.mainEntityOfPage?.flatMap((section) =>
          section.mainEntityOfPage?.map((item) => ({
            headline: item.headline,
            text: item.text?.replace(/<[^>]+>/g, ''),
            url: item.url
          })) || []
        ) || [];

        setTips(allItems.filter(tip => tip.headline));
      } catch (err) {
        console.error(err);
        setError('Unable to load health tips.');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="medicine-finder-container">
  <div className="image-section">
    <img src={require('../assets/livewell.png')} alt="Live Well" className="livewell-img" />
    <span className="image-copyright">© Designed by Freepik</span>
  </div>
  <div className="search-section">
    <h2 className="title">🌿 Live Well Tips</h2>
    <p className="intro-text">Discover trusted NHS tips on nutrition, fitness, sleep, mental wellbeing and more to help you live a healthier, happier life.</p>
  </div>


      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="slider-container">
        <div className="slider">
          {tips.map((tip, index) => {
            const Icon = icons[index % icons.length];
            const summary = getSummary(tip.headline);
            const publicUrl = tip.url?.replace('https://int.api.service.nhs.uk/nhs-website-content', 'https://www.nhs.uk');

            return (
              <div key={index} className="tip-card">
                <div className="tip-icon"><Icon size={32} color="#3e7699" /></div>
                <h3 className="tip-title">{tip.headline}</h3>
                {summary && <p className="tip-description">{summary}</p>}
                {tip.url && (
                 <a
                 className="tip-link"
                 href={publicUrl}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Learn more <ChevronRight size={16} />
               </a>
               
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LiveWellTips;
