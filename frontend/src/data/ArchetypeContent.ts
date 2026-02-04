/**
 * ArchetypeContent.ts
 * 
 * Centralized content structure for all report pages.
 * Contains text variations for all 4 archetypes in both Hebrew and English.
 * Content is selected dynamically based on calculated archetype and scores.
 */

export type ArchetypeKey = 'magnet' | 'bridge' | 'gardener' | 'pioneer';
export type Language = 'he' | 'en';

export interface ArchetypeContent {
  // Page 3: Executive Summary
  snapshot: {
    keyInsight: string;
    topStrengths: string[];
    growthAreas: string[];
  };

  // Page 5: Strengths Analysis
  strengths: {
    narrative: string;
    focusTraits: string[];
  };

  // Page 6: Challenge Focus
  challenge: {
    title: string;
    description: string;
    focusArea: string;
  };

  // Page 9: Risks
  risks: Array<{
    title: string;
    description: string;
  }>;

  // Page 10: Roadmap
  roadmap: Array<{
    title: string;
    description: string;
    actions: string[];
  }>;

  // Page 11: Actions
  actions: Array<{
    id: string;
    text: string;
    category: string;
  }>;
}

export interface ArchetypeContentSet {
  [key: string]: ArchetypeContent;
}

export interface AllArchetypeContent {
  he: {
    magnet: ArchetypeContent;
    bridge: ArchetypeContent;
    gardener: ArchetypeContent;
    pioneer: ArchetypeContent;
  };
  en: {
    magnet: ArchetypeContent;
    bridge: ArchetypeContent;
    gardener: ArchetypeContent;
    pioneer: ArchetypeContent;
  };
}

// Content for all archetypes in Hebrew
export const archetypeContentHe: AllArchetypeContent['he'] = {
  magnet: {
    snapshot: {
      keyInsight: 'אתה מוקד משיכה רשתית - אחרים פונים אליך ביוזמתם. הרשת שלך מבוססת על אמון ומרכזיות גבוהה.',
      topStrengths: [
        'מרכזיות נתפסת גבוהה',
        'יסוד אמון חזק',
        'יצירת ערך לאחרים',
        'יכולת משיכת קשרים'
      ],
      growthAreas: [
        'ניהול אסטרטגי של קשרים',
        'איזון בין רוחב לעומק',
        'מניעת עומס יתר'
      ]
    },
    strengths: {
      narrative: 'הרשת שלך מאופיינת במרכזיות גבוהה ואמון חזק. אנשים פונים אליך באופן טבעי, מה שמציב אותך בעמדת השפעה משמעותית.',
      focusTraits: [
        'אמון ואמינות גבוהים',
        'משיכת קשרים טבעית',
        'יצירת ערך לאחרים',
        'ביטחון פסיכולוגי'
      ]
    },
    challenge: {
      title: 'ניהול עומס ומניעת צוואר בקבוק',
      description: 'המרכזיות הגבוהה שלך עלולה ליצור תלות של אחרים בך. חשוב לפתח מנגנוני ביזור ולשמור על איזון.',
      focusArea: 'פיתוח מנגנוני ביזור, ניהול זמן אסטרטגי, ופיתוח עצמאות של אחרים ברשת.'
    },
    risks: [
      {
        title: 'עומס יתר',
        description: 'הסיכון להיות נקודת כניסה מרכזית עלול להוביל לעומס יתר ולשחיקה.'
      },
      {
        title: 'צוואר בקבוק',
        description: 'תלות יתר של אחרים בך עלולה ליצור צוואר בקבוק ולעכב תהליכים.'
      }
    ],
    roadmap: [
      {
        title: 'תחזוקה אסטרטגית',
        description: 'פיתוח מנגנונים לשמירה על קשרים איכותיים תוך מניעת עומס יתר.',
        actions: [
          'זיהוי קשרים מרכזיים לתחזוקה',
          'יצירת מנגנוני תקשורת יעילים',
          'פיתוח עצמאות של אחרים ברשת'
        ]
      },
      {
        title: 'ביזוריות',
        description: 'פיתוח יכולת להפנות אחרים לקשרים נוספים במקום להיות נקודת כניסה יחידה.',
        actions: [
          'יצירת קשרים בין אנשים ברשת',
          'פיתוח יכולת הפניה',
          'בניית רשתות משנה'
        ]
      },
      {
        title: 'ניהול עומס',
        description: 'פיתוח כלים וכללים לניהול זמן ואנרגיה ברשת.',
        actions: [
          'הגדרת גבולות ברורים',
          'פיתוח סדרי עדיפויות',
          'יצירת מנגנוני סינון'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'צור רשימה של 20 הקשרים החשובים ביותר שלך', category: 'תחזוקה' },
      { id: '2', text: 'הקצה זמן שבועי לחשיבה אסטרטגית על הרשת', category: 'תכנון' },
      { id: '3', text: 'פתח מנגנון להפניה של אחרים לקשרים נוספים', category: 'ביזוריות' }
    ]
  },
  bridge: {
    snapshot: {
      keyInsight: 'אתה מגשר אסטרטגי - אתה מחבר בין קבוצות שונות וחוצה גבולות. הרשת שלך מאופיינת בגיוון גבוה ותיווך.',
      topStrengths: [
        'גישור בין קבוצות',
        'גיוון רשת גבוה',
        'יכולות תיווך',
        'חיבור בין עולמות שונים'
      ],
      growthAreas: [
        'שמירה על איזון בין קבוצות',
        'פיתוח קשרים עמוקים יותר',
        'מניעת פיזור יתר'
      ]
    },
    strengths: {
      narrative: 'הרשת שלך מאופיינת ביכולת יוצאת דופן לחבר בין קבוצות שונות ולגשר על פערים. אתה משמש כמתווך אסטרטגי.',
      focusTraits: [
        'גישור בין קבוצות',
        'גיוון רשת',
        'תיווך מידע',
        'חיבור בין עולמות'
      ]
    },
    challenge: {
      title: 'איזון בין קבוצות ומניעת פיזור',
      description: 'הגיוון הגבוה שלך עלול להוביל לפיזור יתר. חשוב לפתח קשרים עמוקים יותר תוך שמירה על הגיוון.',
      focusArea: 'פיתוח קשרים עמוקים יותר, יצירת איזון בין הקבוצות השונות, ופיתוח יכולת מיקוד.'
    },
    risks: [
      {
        title: 'פיזור יתר',
        description: 'הקשר עם קבוצות רבות עלול להוביל לחוסר עומק ולפיזור משאבים.'
      },
      {
        title: 'חוסר שייכות',
        description: 'היותך בין קבוצות עלול ליצור תחושת חוסר שייכות מלאה לאף קבוצה.'
      }
    ],
    roadmap: [
      {
        title: 'עמקת קשרים',
        description: 'פיתוח קשרים עמוקים יותר בתוך כל קבוצה תוך שמירה על הגיוון.',
        actions: [
          'זיהוי קשרים מרכזיים בכל קבוצה',
          'פיתוח קשרים אישיים עמוקים יותר',
          'יצירת הזדמנויות למפגשים משמעותיים'
        ]
      },
      {
        title: 'איזון אסטרטגי',
        description: 'יצירת איזון בין הקבוצות השונות והזדמנויות התיווך.',
        actions: [
          'מיפוי הקבוצות השונות',
          'יצירת סדרי עדיפויות',
          'פיתוח אסטרטגיית תיווך'
        ]
      },
      {
        title: 'מיקוד',
        description: 'פיתוח יכולת מיקוד על תחומים מרכזיים תוך שמירה על הגיוון.',
        actions: [
          'זיהוי תחומי מיקוד מרכזיים',
          'פיתוח מומחיות בתחומים נבחרים',
          'יצירת איזון בין רוחב לעומק'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'מפה את הקבוצות השונות ברשת שלך', category: 'מיפוי' },
      { id: '2', text: 'זהה 3-5 קשרים מרכזיים בכל קבוצה לפיתוח', category: 'עמקת קשרים' },
      { id: '3', text: 'צור הזדמנויות לחיבור בין אנשים מקבוצות שונות', category: 'תיווך' }
    ]
  },
  gardener: {
    snapshot: {
      keyInsight: 'אתה מטפח רשתות - אתה מטפח ושומר על קשרים בקפידה. הרשת שלך מאופיינת בהדדיות ואמון.',
      topStrengths: [
        'תחזוקת קשרים מצוינת',
        'הדדיות חזקה',
        'אמון ואמינות',
        'הטמעה יחסית עמוקה'
      ],
      growthAreas: [
        'הרחבת מגוון הרשת',
        'הגברת פעילות הרשת',
        'בניית קשרים חדשים'
      ]
    },
    strengths: {
      narrative: 'הרשת שלך מאופיינת בטיפוח קפדני של קשרים קיימים והדדיות חזקה. אתה משקיע בקשרים ארוכי טווח.',
      focusTraits: [
        'תחזוקת קשרים',
        'הדדיות',
        'אמון',
        'עומק יחסי'
      ]
    },
    challenge: {
      title: 'הרחבת הרשת ומניעת בידוד',
      description: 'המיקוד בקשרים קיימים עלול להגביל את הגיוון וההזדמנויות. חשוב לפתח קשרים חדשים.',
      focusArea: 'הרחבת הרשת, יצירת קשרים חדשים, ופיתוח גיוון תוך שמירה על איכות הקשרים הקיימים.'
    },
    risks: [
      {
        title: 'בידוד רשתי',
        description: 'מיקוד יתר בקשרים קיימים עלול להוביל לבידוד מהזדמנויות חדשות.'
      },
      {
        title: 'חוסר גיוון',
        description: 'רשת קטנה ומגובשת עלולה להגביל את הגישה למידע והזדמנויות חדשות.'
      }
    ],
    roadmap: [
      {
        title: 'הרחבת הרשת',
        description: 'פיתוח קשרים חדשים תוך שמירה על איכות הקשרים הקיימים.',
        actions: [
          'זיהוי תחומים חדשים להתפתחות',
          'יצירת קשרים עם אנשים מתחומים שונים',
          'פיתוח אסטרטגיית התרחבות'
        ]
      },
      {
        title: 'גיוון',
        description: 'פיתוח גיוון ברשת תוך שמירה על איכות הקשרים.',
        actions: [
          'חיפוש קשרים מתחומים שונים',
          'יצירת קשרים עם אנשים מרקעים שונים',
          'פיתוח רשת מגוונת'
        ]
      },
      {
        title: 'פעילות',
        description: 'הגברת הפעילות ברשת תוך שמירה על איכות הקשרים.',
        actions: [
          'יצירת הזדמנויות למפגשים',
          'פיתוח יוזמות משותפות',
          'הגברת הנוכחות ברשת'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'צור רשימה של 10 אנשים חדשים שתרצה להכיר', category: 'הרחבה' },
      { id: '2', text: 'זהה 3 תחומים חדשים להתפתחות', category: 'גיוון' },
      { id: '3', text: 'הגבר את הפעילות ברשת הקיימת', category: 'פעילות' }
    ]
  },
  pioneer: {
    snapshot: {
      keyInsight: 'אתה חלוץ רשתות - אתה בונה ומרחיב את הרשת שלך באופן פעיל. הרשת שלך מאופיינת בצמיחה וגיוון.',
      topStrengths: [
        'בניית רשת פעילה',
        'גיוון רשת גבוה',
        'חיפוש הזדמנויות',
        'גישה חוקרת'
      ],
      growthAreas: [
        'פיתוח קשרים עמוקים יותר',
        'תחזוקת קשרים קיימים',
        'איזון בין הרחבה לעומק'
      ]
    },
    strengths: {
      narrative: 'הרשת שלך מאופיינת בצמיחה פעילה וחיפוש הזדמנויות. אתה בונה קשרים חדשים באופן מתמיד.',
      focusTraits: [
        'בניית קשרים',
        'גיוון רשת',
        'חיפוש הזדמנויות',
        'גישה חוקרת'
      ]
    },
    challenge: {
      title: 'עמקת קשרים ותחזוקה',
      description: 'המיקוד בבניית קשרים חדשים עלול להזניח את הקשרים הקיימים. חשוב לפתח עומק ותחזוקה.',
      focusArea: 'פיתוח קשרים עמוקים יותר, תחזוקת קשרים קיימים, ואיזון בין הרחבה לעומק.'
    },
    risks: [
      {
        title: 'קשרים שטחיים',
        description: 'מיקוד יתר בהרחבה עלול להוביל לקשרים שטחיים ללא עומק.'
      },
      {
        title: 'הזנחת קשרים קיימים',
        description: 'המיקוד בקשרים חדשים עלול להזניח את הקשרים הקיימים.'
      }
    ],
    roadmap: [
      {
        title: 'עמקת קשרים',
        description: 'פיתוח קשרים עמוקים יותר מתוך הקשרים הקיימים.',
        actions: [
          'זיהוי קשרים מרכזיים לפיתוח',
          'יצירת הזדמנויות למפגשים משמעותיים',
          'פיתוח קשרים אישיים עמוקים יותר'
        ]
      },
      {
        title: 'תחזוקה',
        description: 'פיתוח מנגנונים לתחזוקת קשרים קיימים תוך המשך ההרחבה.',
        actions: [
          'יצירת סדר יום לתחזוקת קשרים',
          'פיתוח מנגנוני תקשורת',
          'יצירת הזדמנויות למפגשים קבועים'
        ]
      },
      {
        title: 'איזון',
        description: 'יצירת איזון בין הרחבה לעומק תוך שמירה על הגיוון.',
        actions: [
          'הגדרת סדרי עדיפויות',
          'פיתוח אסטרטגיית איזון',
          'יצירת מנגנוני בקרה'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'זהה 10 קשרים קיימים לפיתוח עומק', category: 'עמקת קשרים' },
      { id: '2', text: 'צור סדר יום שבועי לתחזוקת קשרים', category: 'תחזוקה' },
      { id: '3', text: 'הגדר סדרי עדיפויות בין הרחבה לעומק', category: 'איזון' }
    ]
  }
};

// Content for all archetypes in English
export const archetypeContentEn: AllArchetypeContent['en'] = {
  magnet: {
    snapshot: {
      keyInsight: 'You are a Network Magnet - others naturally turn to you. Your network is built on trust and high centrality.',
      topStrengths: [
        'High perceived centrality',
        'Strong trust foundation',
        'Creating value for others',
        'Natural connection attraction'
      ],
      growthAreas: [
        'Strategic relationship management',
        'Balance between breadth and depth',
        'Preventing overload'
      ]
    },
    strengths: {
      narrative: 'Your network is characterized by high centrality and strong trust. People naturally turn to you, positioning you in a significant role of influence.',
      focusTraits: [
        'High trust and reliability',
        'Natural connection attraction',
        'Creating value for others',
        'Psychological safety'
      ]
    },
    challenge: {
      title: 'Load Management and Preventing Bottlenecks',
      description: 'Your high centrality may create dependency of others on you. It\'s important to develop decentralization mechanisms and maintain balance.',
      focusArea: 'Developing decentralization mechanisms, strategic time management, and developing independence of others in the network.'
    },
    risks: [
      {
        title: 'Overload (Burnout)',
        description: 'The risk of being a central entry point may lead to overload and burnout.'
      },
      {
        title: 'Bottleneck',
        description: 'Excessive dependency of others on you may create bottlenecks and delay processes.'
      }
    ],
    roadmap: [
      {
        title: 'Strategic Maintenance',
        description: 'Developing mechanisms for maintaining quality relationships while preventing overload.',
        actions: [
          'Identify key relationships for maintenance',
          'Create efficient communication mechanisms',
          'Develop independence of others in the network'
        ]
      },
      {
        title: 'Decentralization',
        description: 'Developing ability to refer others to additional connections instead of being a single entry point.',
        actions: [
          'Create connections between people in the network',
          'Develop referral capabilities',
          'Build subnetworks'
        ]
      },
      {
        title: 'Load Management',
        description: 'Developing tools and rules for managing time and energy in the network.',
        actions: [
          'Set clear boundaries',
          'Develop priorities',
          'Create filtering mechanisms'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'Create a list of your 20 most important connections', category: 'Maintenance' },
      { id: '2', text: 'Allocate weekly time for strategic thinking about the network', category: 'Planning' },
      { id: '3', text: 'Develop a mechanism to refer others to additional connections', category: 'Decentralization' }
    ]
  },
  bridge: {
    snapshot: {
      keyInsight: 'You are a Strategic Bridge - you connect different groups and span boundaries. Your network is characterized by high diversity and brokerage.',
      topStrengths: [
        'Bridging between groups',
        'High network diversity',
        'Brokerage capabilities',
        'Connecting different worlds'
      ],
      growthAreas: [
        'Maintaining balance between groups',
        'Developing deeper connections',
        'Preventing over-dispersion'
      ]
    },
    strengths: {
      narrative: 'Your network is characterized by exceptional ability to connect different groups and bridge gaps. You serve as a strategic broker.',
      focusTraits: [
        'Bridging between groups',
        'Network diversity',
        'Information brokerage',
        'Connecting different worlds'
      ]
    },
    challenge: {
      title: 'Balance Between Groups and Preventing Dispersion',
      description: 'Your high diversity may lead to over-dispersion. It\'s important to develop deeper connections while maintaining diversity.',
      focusArea: 'Developing deeper connections, creating balance between different groups, and developing focus capabilities.'
    },
    risks: [
      {
        title: 'Over-Dispersion',
        description: 'Connection with many groups may lead to lack of depth and dispersion of resources.'
      },
      {
        title: 'Lack of Belonging',
        description: 'Being between groups may create a sense of not fully belonging to any group.'
      }
    ],
    roadmap: [
      {
        title: 'Deepening Connections',
        description: 'Developing deeper connections within each group while maintaining diversity.',
        actions: [
          'Identify key connections in each group',
          'Develop deeper personal connections',
          'Create opportunities for meaningful meetings'
        ]
      },
      {
        title: 'Strategic Balance',
        description: 'Creating balance between different groups and brokerage opportunities.',
        actions: [
          'Map different groups',
          'Create priorities',
          'Develop brokerage strategy'
        ]
      },
      {
        title: 'Focus',
        description: 'Developing ability to focus on key areas while maintaining diversity.',
        actions: [
          'Identify key focus areas',
          'Develop expertise in selected areas',
          'Create balance between breadth and depth'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'Map the different groups in your network', category: 'Mapping' },
      { id: '2', text: 'Identify 3-5 key connections in each group for development', category: 'Deepening' },
      { id: '3', text: 'Create opportunities to connect people from different groups', category: 'Brokerage' }
    ]
  },
  gardener: {
    snapshot: {
      keyInsight: 'You are a Network Gardener - you nurture and maintain relationships with care. Your network is characterized by reciprocity and trust.',
      topStrengths: [
        'Excellent relationship maintenance',
        'Strong reciprocity',
        'Trust and reliability',
        'Deep relational embeddedness'
      ],
      growthAreas: [
        'Expanding network diversity',
        'Increasing network activity',
        'Building new connections'
      ]
    },
    strengths: {
      narrative: 'Your network is characterized by careful nurturing of existing relationships and strong reciprocity. You invest in long-term relationships.',
      focusTraits: [
        'Relationship maintenance',
        'Reciprocity',
        'Trust',
        'Relational depth'
      ]
    },
    challenge: {
      title: 'Expanding the Network and Preventing Isolation',
      description: 'Focus on existing connections may limit diversity and opportunities. It\'s important to develop new connections.',
      focusArea: 'Expanding the network, creating new connections, and developing diversity while maintaining quality of existing relationships.'
    },
    risks: [
      {
        title: 'Network Isolation',
        description: 'Over-focus on existing connections may lead to isolation from new opportunities.'
      },
      {
        title: 'Lack of Diversity',
        description: 'A small, cohesive network may limit access to new information and opportunities.'
      }
    ],
    roadmap: [
      {
        title: 'Network Expansion',
        description: 'Developing new connections while maintaining quality of existing relationships.',
        actions: [
          'Identify new areas for development',
          'Create connections with people from different fields',
          'Develop expansion strategy'
        ]
      },
      {
        title: 'Diversity',
        description: 'Developing network diversity while maintaining relationship quality.',
        actions: [
          'Seek connections from different fields',
          'Create connections with people from different backgrounds',
          'Develop a diverse network'
        ]
      },
      {
        title: 'Activity',
        description: 'Increasing network activity while maintaining relationship quality.',
        actions: [
          'Create opportunities for meetings',
          'Develop joint initiatives',
          'Increase network presence'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'Create a list of 10 new people you want to meet', category: 'Expansion' },
      { id: '2', text: 'Identify 3 new areas for development', category: 'Diversity' },
      { id: '3', text: 'Increase activity in your existing network', category: 'Activity' }
    ]
  },
  pioneer: {
    snapshot: {
      keyInsight: 'You are a Network Pioneer - you actively build and expand your network. Your network is characterized by growth and diversity.',
      topStrengths: [
        'Active network building',
        'High network diversity',
        'Opportunity seeking',
        'Exploratory approach'
      ],
      growthAreas: [
        'Developing deeper connections',
        'Maintaining existing connections',
        'Balance between expansion and depth'
      ]
    },
    strengths: {
      narrative: 'Your network is characterized by active growth and opportunity seeking. You continuously build new connections.',
      focusTraits: [
        'Building connections',
        'Network diversity',
        'Opportunity seeking',
        'Exploratory approach'
      ]
    },
    challenge: {
      title: 'Deepening Connections and Maintenance',
      description: 'Focus on building new connections may neglect existing ones. It\'s important to develop depth and maintenance.',
      focusArea: 'Developing deeper connections, maintaining existing connections, and balancing expansion with depth.'
    },
    risks: [
      {
        title: 'Superficial Connections',
        description: 'Over-focus on expansion may lead to superficial connections without depth.'
      },
      {
        title: 'Neglecting Existing Connections',
        description: 'Focus on new connections may neglect existing ones.'
      }
    ],
    roadmap: [
      {
        title: 'Deepening Connections',
        description: 'Developing deeper connections from existing ones.',
        actions: [
          'Identify key connections for development',
          'Create opportunities for meaningful meetings',
          'Develop deeper personal connections'
        ]
      },
      {
        title: 'Maintenance',
        description: 'Developing mechanisms for maintaining existing connections while continuing expansion.',
        actions: [
          'Create a schedule for connection maintenance',
          'Develop communication mechanisms',
          'Create opportunities for regular meetings'
        ]
      },
      {
        title: 'Balance',
        description: 'Creating balance between expansion and depth while maintaining diversity.',
        actions: [
          'Set priorities',
          'Develop balance strategy',
          'Create control mechanisms'
        ]
      }
    ],
    actions: [
      { id: '1', text: 'Identify 10 existing connections for depth development', category: 'Deepening' },
      { id: '2', text: 'Create a weekly schedule for connection maintenance', category: 'Maintenance' },
      { id: '3', text: 'Set priorities between expansion and depth', category: 'Balance' }
    ]
  }
};

/**
 * Get content for a specific archetype and language
 */
export function getArchetypeContent(
  archetypeKey: ArchetypeKey,
  language: Language
): ArchetypeContent {
  const content = language === 'he' ? archetypeContentHe : archetypeContentEn;
  return content[archetypeKey];
}

/**
 * Get all content for a specific language
 */
export function getAllArchetypeContent(language: Language): AllArchetypeContent[typeof language] {
  return language === 'he' ? archetypeContentHe : archetypeContentEn;
}
