import React from 'react';
import './nbs-styles.css';

interface Archetype {
  key: string;
  name: string;
  description: string;
  graphic: React.ReactNode;
}

interface ArchetypeGridProps {
  archetypes?: Archetype[];
  userArchetype?: string;
  isRTL?: boolean;
}

const ArchetypeGrid: React.FC<ArchetypeGridProps> = ({ archetypes, userArchetype, isRTL = false }) => {
  const displayArchetypes = archetypes || [];

  return (
    <div className="report-page report-archetype-grid">
      <h2 className="page-title">
        {isRTL ? 'נספח - כל הטיפוסים' : 'Methodology - All Archetypes'}
      </h2>

      <div className="archetype-grid">
        {displayArchetypes.length > 0 ? (
          displayArchetypes.map((archetype) => (
            <div key={archetype?.key || Math.random()} className="archetype-grid-item">
              {archetype?.graphic && (
                <div className="archetype-grid-graphic">
                  {archetype.graphic}
                </div>
              )}
              <h3 className="archetype-grid-name">{archetype?.name || 'Archetype'}</h3>
              <p className="archetype-grid-description">{archetype?.description || ''}</p>
            </div>
          ))
        ) : (
          <div className="archetype-grid-empty">
            <p>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchetypeGrid;
