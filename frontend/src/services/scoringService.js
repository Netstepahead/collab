// Scoring service for calculating skill scores from responses

export function calculateScores(responses) {
  // Initialize skill scores (12 skills, 3 questions each)
  const skillScores = {};
  for (let i = 1; i <= 12; i++) {
    skillScores[i] = {
      total: 0,
      count: 0,
      average: 0
    };
  }

  // Calculate scores for each skill
  responses.forEach(response => {
    const questionId = response.questionId;
    const answer = response.answer; // Should be 1-5 scale

    // Determine which skill this question belongs to (1-12)
    // Each skill has 3 questions
    const skillId = Math.ceil(questionId / 3);

    if (skillScores[skillId]) {
      skillScores[skillId].total += answer;
      skillScores[skillId].count += 1;
    }
  });

  // Calculate averages
  Object.keys(skillScores).forEach(skillId => {
    const skill = skillScores[skillId];
    if (skill.count > 0) {
      skill.average = Math.round((skill.total / skill.count) * 10) / 10; // Round to 1 decimal
    }
  });

  return skillScores;
}

// Map skills to profile indicators
function getIndicatorScore(skillScores, indicator) {
  // Map indicators to skill IDs
  const indicatorMap = {
    'building': skillScores[1]?.average || 0, // בניית קשרים
    'maintaining': skillScores[2]?.average || 0, // תחזוקת קשרים
    'using': skillScores[3]?.average || 0, // שימוש בקשרים
    'diversity': ((skillScores[4]?.average || 0) + (skillScores[5]?.average || 0)) / 2, // גיוון
    'reciprocity': skillScores[6]?.average || 0, // הדדיות
    'trust': skillScores[7]?.average || 0, // אמון
    'safety': skillScores[8]?.average || 0, // ביטחון פסיכולוגי
    'bridging': skillScores[9]?.average || 0, // גישור בין קבוצות
    'attracting': skillScores[10]?.average || 0, // משיכת קשרים
    'value': skillScores[11]?.average || 0, // יצירת ערך לאחרים
    'leadership': skillScores[12]?.average || 0 // מנהיגות פנים-רשתית
  };
  
  return indicatorMap[indicator] || 0;
}

function calculateProfileScore(skillScores, profileType) {
  let score = 0;
  
  switch(profileType) {
    case 'magnet':
      // מדדי ליבה (40%): משיכת קשרים, אמון
      score += getIndicatorScore(skillScores, 'attracting') * 0.20;
      score += getIndicatorScore(skillScores, 'trust') * 0.20;
      // מדדי תמיכה (35%): ביטחון פסיכולוגי, יצירת ערך לאחרים
      score += getIndicatorScore(skillScores, 'safety') * 0.175;
      score += getIndicatorScore(skillScores, 'value') * 0.175;
      // מדדי חיזוק (25%): גישור בין קבוצות, שימוש בקשרים
      score += getIndicatorScore(skillScores, 'bridging') * 0.125;
      score += getIndicatorScore(skillScores, 'using') * 0.125;
      break;
      
    case 'bridge':
      // מדדי ליבה (45%): גישור בין קבוצות, גיוון
      score += getIndicatorScore(skillScores, 'bridging') * 0.225;
      score += getIndicatorScore(skillScores, 'diversity') * 0.225;
      // מדדי תמיכה (35%): ביזוריות (נמוך במרכזיות), שימוש בקשרים
      // ביזוריות = נמוך במשיכת קשרים (הפוך)
      score += (5 - getIndicatorScore(skillScores, 'attracting')) * 0.175;
      score += getIndicatorScore(skillScores, 'using') * 0.175;
      // מדדי חיזוק (20%): מנהיגות פנים-רשתית
      score += getIndicatorScore(skillScores, 'leadership') * 0.20;
      break;
      
    case 'gardener':
      // מדדי ליבה (45%): תחזוקת קשרים, הדדיות
      score += getIndicatorScore(skillScores, 'maintaining') * 0.225;
      score += getIndicatorScore(skillScores, 'reciprocity') * 0.225;
      // מדדי תמיכה (35%): אמון, ביטחון פסיכולוגי
      score += getIndicatorScore(skillScores, 'trust') * 0.175;
      score += getIndicatorScore(skillScores, 'safety') * 0.175;
      // מדדי חיזוק (20%): יצירת ערך לאחרים
      score += getIndicatorScore(skillScores, 'value') * 0.20;
      break;
      
    case 'pioneer':
      // מדדי ליבה (45%): בניית קשרים, גיוון
      score += getIndicatorScore(skillScores, 'building') * 0.225;
      score += getIndicatorScore(skillScores, 'diversity') * 0.225;
      // מדדי תמיכה (35%): שימוש בקשרים, גישור בין קבוצות
      score += getIndicatorScore(skillScores, 'using') * 0.175;
      score += getIndicatorScore(skillScores, 'bridging') * 0.175;
      // מדדי חיזוק (20%): מנהיגות פנים-רשתית
      score += getIndicatorScore(skillScores, 'leadership') * 0.20;
      break;
      default:
  break;
  }
  
  return Math.round(score * 100) / 100; // Round to 2 decimals
}

function checkThresholds(skillScores, profileType) {
  switch(profileType) {
    case 'magnet':
      return getIndicatorScore(skillScores, 'attracting') >= 4.2 && 
             getIndicatorScore(skillScores, 'trust') >= 4.0;
    case 'bridge':
      return getIndicatorScore(skillScores, 'bridging') >= 4.0 && 
             getIndicatorScore(skillScores, 'diversity') >= 3.6;
    case 'gardener':
      return getIndicatorScore(skillScores, 'maintaining') >= 4.0 && 
             getIndicatorScore(skillScores, 'reciprocity') >= 4.0;
    case 'pioneer':
      return getIndicatorScore(skillScores, 'building') >= 4.0 && 
             getIndicatorScore(skillScores, 'diversity') >= 3.8;
    default:
      return false;
  }
}

export function determineProfile(skillScores) {
  // Calculate scores for all 4 profile types
  const profileScores = {
    magnet: calculateProfileScore(skillScores, 'magnet'),
    bridge: calculateProfileScore(skillScores, 'bridge'),
    gardener: calculateProfileScore(skillScores, 'gardener'),
    pioneer: calculateProfileScore(skillScores, 'pioneer')
  };
  
  // Check thresholds - only consider profiles that meet thresholds
  const validProfiles = {};
  Object.keys(profileScores).forEach(profile => {
    if (checkThresholds(skillScores, profile)) {
      validProfiles[profile] = profileScores[profile];
    }
  });
  
  // If no profile meets thresholds, use the highest scoring one anyway
  const profilesToUse = Object.keys(validProfiles).length > 0 ? validProfiles : profileScores;
  
  // Sort by score (highest first)
  const sortedProfiles = Object.entries(profilesToUse)
    .sort((a, b) => b[1] - a[1]);
  
  const primary = sortedProfiles[0][0];
  const primaryScore = sortedProfiles[0][1];
  const secondary = sortedProfiles.length > 1 && (primaryScore - sortedProfiles[1][1]) < 0.4 
    ? sortedProfiles[1][0] 
    : null;
  const secondaryScore = secondary ? sortedProfiles[1][1] : null;
  
  return {
    primary,
    primaryScore,
    secondary,
    secondaryScore,
    allScores: profileScores
  };
}
