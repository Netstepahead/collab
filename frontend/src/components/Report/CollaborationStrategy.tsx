import React from 'react';
import './nbs-styles.css';

// Helper to get archetype image path
const getArchetypeImagePath = (archetypeKey: string, language: string): string => {
  const imageMap: { [key: string]: string } = {
    'magnet': language === 'he' ? '/images/archetypes/magnet-he.png' : '/images/archetypes/magnet-en.png',
    'bridge': language === 'he' ? '/images/archetypes/bridge-heb.png' : '/images/archetypes/bridge-en.png',
    'gardener': language === 'he' ? '/images/archetypes/gardener-heb.png' : '/images/archetypes/gardener-en.png',
    'pioneer': language === 'he' ? '/images/archetypes/pioneer-he.png' : '/images/archetypes/pioneer-en.png',
  };
  return imageMap[archetypeKey] || imageMap['magnet'];
};

interface CollaborationStrategyProps {
  primaryArchetype?: string;
  secondaryArchetype?: string;
  isRTL?: boolean;
}

// Archetype config with collaboration tips (no icons - using images instead)
const archetypeConfig: { [key: string]: { name: { en: string; he: string }; partnerTip: { en: string; he: string }; workingTip: { en: string; he: string } } } = {
  magnet: {
    name: { en: 'Network Magnet', he: 'מוקד משיכה רשתי' },
    partnerTip: { 
      en: 'You attract connections naturally. Your ideal partner can deepen and nurture the relationships you initiate, turning quantity into quality.',
      he: 'אתה מושך קשרים באופן טבעי. השותף האידיאלי שלך יכול להעמיק ולטפח את הקשרים שאתה יוזם, והופך כמות לאיכות.'
    },
    workingTip: { 
      en: 'Leverage your charisma while learning to delegate network maintenance.',
      he: 'נצל את הכריזמה שלך תוך כדי למידה לאצול תחזוקת רשת.'
    }
  },
  bridge: {
    name: { en: 'Strategic Bridge', he: 'גשר אסטרטגי' },
    partnerTip: { 
      en: 'You connect diverse groups. Partner with someone who can deepen relationships you initiate.',
      he: 'אתה מחבר קבוצות מגוונות. התחבר עם מישהו שיכול להעמיק קשרים שאתה יוזם.'
    },
    workingTip: { 
      en: 'Focus on quality introductions and let partners nurture ongoing connections.',
      he: 'התמקד בהיכרויות איכותיות ותן לשותפים לטפח קשרים מתמשכים.'
    }
  },
  gardener: {
    name: { en: 'Network Gardener', he: 'גנן הרשת' },
    partnerTip: { 
      en: 'You excel at nurturing relationships. Partner with connectors who can expand your reach.',
      he: 'אתה מצטיין בטיפוח קשרים. התחבר עם מקשרים שיכולים להרחיב את טווח ההגעה שלך.'
    },
    workingTip: { 
      en: 'Maintain deep relationships while partners bring new opportunities.',
      he: 'שמור על קשרים עמוקים בעוד שותפים מביאים הזדמנויות חדשות.'
    }
  },
  pioneer: {
    name: { en: 'Network Pioneer', he: 'חלוץ הרשתות' },
    partnerTip: { 
      en: 'You create new pathways. Partner with those who can sustain the connections you forge.',
      he: 'אתה יוצר נתיבים חדשים. התחבר עם אלה שיכולים לקיים את הקשרים שאתה יוצר.'
    },
    workingTip: { 
      en: 'Lead with innovation and let partners handle relationship maintenance.',
      he: 'הוביל עם חדשנות ותן לשותפים לטפל בתחזוקת קשרים.'
    }
  }
};

const CollaborationStrategy: React.FC<CollaborationStrategyProps> = ({ 
  primaryArchetype = 'magnet',
  secondaryArchetype,
  isRTL = false
}) => {
  const lang = isRTL ? 'he' : 'en';
  
  // Get archetype configs
  const primaryConfig = archetypeConfig[primaryArchetype] || archetypeConfig.magnet;
  
  // Get complementary archetype based on logical pairing
  const complementaryPairs: { [key: string]: string } = {
    magnet: 'gardener',   // Magnet needs someone to deepen connections
    bridge: 'gardener',   // Bridge needs someone to deepen connections
    gardener: 'magnet',   // Gardener needs someone to expand reach
    pioneer: 'gardener'   // Pioneer needs someone to maintain connections
  };
  
  const complementaryArchetype = complementaryPairs[primaryArchetype] || 'gardener';
  const complementaryConfig = archetypeConfig[complementaryArchetype];
  
  const allArchetypes = Object.keys(archetypeConfig);
  
  // Other archetypes for "working with" section
  const otherArchetypes = allArchetypes.filter(
    key => key !== primaryArchetype && key !== complementaryArchetype
  ).slice(0, 2);

  // Get image paths
  const primaryImagePath = getArchetypeImagePath(primaryArchetype, lang);
  const complementaryImagePath = getArchetypeImagePath(complementaryArchetype, lang);

  return (
    <div className={`report-page collaboration-strategy ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="page-title">
        {isRTL ? 'אסטרטגיית שיתוף פעולה' : 'Collaboration Strategy'}
      </h2>

      <div className="collab-intro">
        <p>{isRTL
          ? 'הצלחה רשתית לא תלויה רק בפרופיל שלך - היא גם תלויה ביכולת שלך לזהות ולשתף פעולה עם פרופילים משלימים.'
          : 'Network success doesn\'t just depend on your profile - it also depends on your ability to identify and collaborate with complementary profiles.'}
        </p>
      </div>

      {/* Hero Card - Ideal Partner */}
      <div className="ideal-partner-card">
        <div className="ideal-partner-header">
          <h3>{isRTL ? 'השותף האידיאלי שלך' : 'Your Ideal Partner'}</h3>
        </div>
        
        <div className="ideal-partner-content">
          <div className="ideal-partner-visual">
            <div className="partner-archetype-primary">
              <img src={primaryImagePath} alt={primaryConfig.name[lang]} className="archetype-img" />
              <span className="partner-label">{isRTL ? 'אתה' : 'You'}</span>
            </div>
            
            <div className="partner-connector">
              <span>+</span>
            </div>
            
            <div className="partner-archetype-secondary">
              <img src={complementaryImagePath} alt={complementaryConfig.name[lang]} className="archetype-img" />
              <span className="partner-label">{complementaryConfig.name[lang]}</span>
            </div>
          </div>

          <div className="ideal-partner-description">
            <p className="partner-insight">
              <strong>{isRTL ? '💡 למה זה עובד:' : '💡 Why it works:'}</strong>
            </p>
            <p>{primaryConfig.partnerTip[lang]}</p>
          </div>
        </div>
      </div>

      {/* Working with Other Archetypes */}
      <div className="other-archetypes-section">
        <h3 className="section-subtitle">{isRTL ? 'עבודה עם פרופילים אחרים' : 'Working with Other Profiles'}</h3>
        
        <div className="other-archetypes-grid">
          {otherArchetypes.map((archetypeKey) => {
            const config = archetypeConfig[archetypeKey];
            const imagePath = getArchetypeImagePath(archetypeKey, lang);
            
            return (
              <div key={archetypeKey} className="archetype-tip-card">
                <div className="tip-card-header">
                  <div className="tip-image-wrapper">
                    <img src={imagePath} alt={config.name[lang]} className="tip-archetype-img" />
                  </div>
                  <h4 className="tip-archetype-name">{config.name[lang]}</h4>
                </div>
                <p className="tip-description">{config.workingTip[lang]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="collab-takeaway">
        <p><strong>{isRTL ? '🎯 מסקנה:' : '🎯 Key Takeaway:'}</strong> {isRTL
          ? 'רשתות חזקות נבנות על ידי שילוב חוזקות משלימות. זהה את הפרופילים המשלימים לשלך וטפח שיתופי פעולה אסטרטגיים.'
          : 'Strong networks are built by combining complementary strengths. Identify profiles that complement yours and cultivate strategic collaborations.'}
        </p>
      </div>
    </div>
  );
};

export default CollaborationStrategy;
