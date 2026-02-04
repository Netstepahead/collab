import React from 'react';
import './nbs-styles.css';

export type InfoCardVariant = 'strengths' | 'growth' | 'default';

interface InfoCardProps {
  title: string;
  items: string[];
  variant?: InfoCardVariant;
  isRTL?: boolean;
}

/**
 * InfoCard Component
 * 
 * A reusable card component for displaying lists of information.
 * Uses StepAhead brand colors:
 * - Strengths: Primary Blue (#1F3A60)
 * - Growth: Secondary Orange (#FBAF3F)
 */
const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  items, 
  variant = 'default',
  isRTL = false 
}) => {
  // Determine border color based on variant
  const borderColor = variant === 'strengths' 
    ? '#1F3A60' // Primary Deep Blue
    : variant === 'growth'
    ? '#FBAF3F' // Secondary Orange
    : '#ddd'; // Default gray

  return (
    <div 
      className={`info-card info-card-${variant} ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ borderLeftColor: borderColor }}
    >
      <h3 className="info-card-title" style={{ color: '#1E88C7' }}>{title}</h3>
      <ul className="info-card-list">
        {items.map((item, idx) => (
          <li key={idx} className="info-card-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;
