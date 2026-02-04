/**
 * ReportContentConfig.ts
 * 
 * Centralized content configuration for all report pages.
 * Maps each archetype to its specific texts in both English and Hebrew.
 * Integrates with existing i18n translation system.
 */

export type ArchetypeKey = 'magnet' | 'bridge' | 'gardener' | 'pioneer';
export type Language = 'he' | 'en';

/**
 * Content structure for each archetype
 */
export interface ArchetypeContentConfig {
  title: string;
  tagline: string;
  deepDive: string[];
  strengths: string[];
  risks: Array<{
    title: string;
    description: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    actions: string[];
  }>;
}

/**
 * Complete content set for all archetypes in both languages
 */
export interface ReportContentConfig {
  he: {
    magnet: ArchetypeContentConfig;
    bridge: ArchetypeContentConfig;
    gardener: ArchetypeContentConfig;
    pioneer: ArchetypeContentConfig;
  };
  en: {
    magnet: ArchetypeContentConfig;
    bridge: ArchetypeContentConfig;
    gardener: ArchetypeContentConfig;
    pioneer: ArchetypeContentConfig;
  };
}

/**
 * Hebrew Content
 */
const hebrewContent: ReportContentConfig['he'] = {
  magnet: {
    title: 'מוקד משיכה רשתית',
    tagline: 'אחרים פונים אליך ביוזמתם',
    deepDive: [
      'אתה מוקד משיכה רשתית - אחרים פונים אליך ביוזמתם. הרשת שלך מבוססת על אמון ומרכזיות גבוהה.',
      'המרכזיות הגבוהה שלך מציבה אותך בעמדת השפעה משמעותית. אנשים מרגישים שהם יכולים לסמוך עליך ולשתף אותך במידע רגיש.',
      'אתה יוצר ערך לאחרים באופן טבעי, מה שמחזק את מעמדך כעגן מרכזי ברשת.',
      'הרשת שלך מאופיינת בקשרים מבוססי אמון, ביטחון פסיכולוגי, ויכולת משיכת קשרים טבעית.'
    ],
    strengths: [
      'מרכזיות נתפסת גבוהה - אחרים מחפשים אותך',
      'יסוד אמון חזק - אנשים סומכים עליך',
      'עגן טבעי ברשת - נקודת כניסה מרכזית',
      'יוצר ערך לאחרים - נתינה הדדית',
      'ביטחון פסיכולוגי - אנשים מרגישים בטוחים איתך',
      'משיכת קשרים טבעית - אנשים פונים אליך'
    ],
    risks: [
      {
        title: 'עומס יתר',
        description: 'הסיכון להיות נקודת כניסה מרכזית עלול להוביל לעומס יתר ולשחיקה. חשוב לפתח מנגנוני ביזור ולשמור על איזון.'
      },
      {
        title: 'צוואר בקבוק',
        description: 'תלות יתר של אחרים בך עלולה ליצור צוואר בקבוק ולעכב תהליכים. חשוב לפתח עצמאות של אחרים ברשת.'
      },
      {
        title: 'חוסר איזון',
        description: 'המיקוד במשיכת קשרים עלול להזניח את התחזוקה והעמקה של קשרים קיימים.'
      }
    ],
    recommendations: [
      {
        title: 'תחזוקה אסטרטגית',
        description: 'פיתוח מנגנונים לשמירה על קשרים איכותיים תוך מניעת עומס יתר.',
        actions: [
          'צור רשימה של 20 הקשרים החשובים ביותר שלך',
          'הקצה זמן שבועי לחשיבה אסטרטגית על הרשת',
          'פתח מנגנון להפניה של אחרים לקשרים נוספים'
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
    ]
  },
  bridge: {
    title: 'מגשר אסטרטגי',
    tagline: 'אתה מחבר בין קבוצות שונות וחוצה גבולות',
    deepDive: [
      'אתה מגשר אסטרטגי - אתה מחבר בין קבוצות שונות וחוצה גבולות. הרשת שלך מאופיינת בגיוון גבוה ותיווך.',
      'הרשת שלך מאופיינת ביכולת יוצאת דופן לחבר בין קבוצות שונות ולגשר על פערים. אתה משמש כמתווך אסטרטגי.',
      'אתה מביא פרספקטיבות מגוונות יחד ויוצר הזדמנויות לחיבור בין עולמות שונים.',
      'הגיוון הגבוה ברשת שלך מאפשר לך לגשת למידע והזדמנויות ממקורות מגוונים.'
    ],
    strengths: [
      'גישור בין קבוצות - מחבר בין עולמות שונים',
      'גיוון רשת גבוה - קשרים מתחומים שונים',
      'יכולות תיווך - מעביר מידע בין קבוצות',
      'חיבור בין עולמות - יוצר הזדמנויות',
      'ביזוריות - לא תלוי בקבוצה אחת',
      'מנהיגות פנים-רשתית - מוביל חיבורים'
    ],
    risks: [
      {
        title: 'פיזור יתר',
        description: 'הקשר עם קבוצות רבות עלול להוביל לחוסר עומק ולפיזור משאבים. חשוב לפתח קשרים עמוקים יותר תוך שמירה על הגיוון.'
      },
      {
        title: 'חוסר שייכות',
        description: 'היותך בין קבוצות עלול ליצור תחושת חוסר שייכות מלאה לאף קבוצה. חשוב לפתח תחושת שייכות בתוך כל קבוצה.'
      },
      {
        title: 'עומס תיווך',
        description: 'המיקוד בתיווך עלול להוביל לעומס ולשחיקה. חשוב לפתח מנגנוני איזון ולשמור על אנרגיה.'
      }
    ],
    recommendations: [
      {
        title: 'עמקת קשרים',
        description: 'פיתוח קשרים עמוקים יותר בתוך כל קבוצה תוך שמירה על הגיוון.',
        actions: [
          'מפה את הקבוצות השונות ברשת שלך',
          'זהה 3-5 קשרים מרכזיים בכל קבוצה לפיתוח',
          'צור הזדמנויות למפגשים משמעותיים'
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
    ]
  },
  gardener: {
    title: 'מטפח רשתות',
    tagline: 'אתה מטפח ושומר על קשרים בקפידה',
    deepDive: [
      'אתה מטפח רשתות - אתה מטפח ושומר על קשרים בקפידה. הרשת שלך מאופיינת בהדדיות ואמון.',
      'הרשת שלך מאופיינת בטיפוח קפדני של קשרים קיימים והדדיות חזקה. אתה משקיע בקשרים ארוכי טווח.',
      'אתה בונה רשת מבוססת אמון, שבה אנשים מרגישים בטוחים לשתף ולבקש עזרה.',
      'ההדדיות החזקה שלך יוצרת רשת תומכת ומגובשת, שבה אנשים מרגישים מחויבים זה לזה.'
    ],
    strengths: [
      'תחזוקת קשרים מצוינת - שומר על קשרים לאורך זמן',
      'הדדיות חזקה - נותן ומקבל באופן שוויוני',
      'אמון ואמינות - אנשים סומכים עליך',
      'הטמעה יחסית עמוקה - קשרים משמעותיים',
      'ביטחון פסיכולוגי - אנשים מרגישים בטוחים',
      'יצירת ערך לאחרים - נתינה הדדית'
    ],
    risks: [
      {
        title: 'בידוד רשתי',
        description: 'מיקוד יתר בקשרים קיימים עלול להוביל לבידוד מהזדמנויות חדשות. חשוב לפתח קשרים חדשים תוך שמירה על איכות הקשרים הקיימים.'
      },
      {
        title: 'חוסר גיוון',
        description: 'רשת קטנה ומגובשת עלולה להגביל את הגישה למידע והזדמנויות חדשות. חשוב לפתח גיוון ברשת.'
      },
      {
        title: 'תלות הדדית',
        description: 'ההדדיות החזקה עלולה ליצור תלות הדדית שעלולה להגביל את העצמאות. חשוב לפתח עצמאות תוך שמירה על ההדדיות.'
      }
    ],
    recommendations: [
      {
        title: 'הרחבת הרשת',
        description: 'פיתוח קשרים חדשים תוך שמירה על איכות הקשרים הקיימים.',
        actions: [
          'צור רשימה של 10 אנשים חדשים שתרצה להכיר',
          'זהה 3 תחומים חדשים להתפתחות',
          'פתח אסטרטגיית התרחבות'
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
    ]
  },
  pioneer: {
    title: 'חלוץ רשתות',
    tagline: 'אתה בונה ומרחיב את הרשת שלך באופן פעיל',
    deepDive: [
      'אתה חלוץ רשתות - אתה בונה ומרחיב את הרשת שלך באופן פעיל. הרשת שלך מאופיינת בצמיחה וגיוון.',
      'הרשת שלך מאופיינת בצמיחה פעילה וחיפוש הזדמנויות. אתה בונה קשרים חדשים באופן מתמיד.',
      'אתה מחפש הזדמנויות חדשות ומגלה תחומים חדשים להתפתחות.',
      'הגישה החוקרת שלך מאפשרת לך לגשת למידע והזדמנויות ממקורות מגוונים.'
    ],
    strengths: [
      'בניית רשת פעילה - יוצר קשרים חדשים באופן מתמיד',
      'גיוון רשת גבוה - קשרים מתחומים שונים',
      'חיפוש הזדמנויות - מחפש הזדמנויות חדשות',
      'גישה חוקרת - מגלה תחומים חדשים',
      'שימוש בקשרים - מנצל את הרשת באופן פעיל',
      'מנהיגות פנים-רשתית - מוביל יוזמות'
    ],
    risks: [
      {
        title: 'קשרים שטחיים',
        description: 'מיקוד יתר בהרחבה עלול להוביל לקשרים שטחיים ללא עומק. חשוב לפתח קשרים עמוקים יותר תוך המשך ההרחבה.'
      },
      {
        title: 'הזנחת קשרים קיימים',
        description: 'המיקוד בקשרים חדשים עלול להזניח את הקשרים הקיימים. חשוב לפתח מנגנוני תחזוקה תוך המשך ההרחבה.'
      },
      {
        title: 'פיזור משאבים',
        description: 'המיקוד בהרחבה עלול להוביל לפיזור משאבים ולחוסר מיקוד. חשוב לפתח סדרי עדיפויות תוך המשך ההרחבה.'
      }
    ],
    recommendations: [
      {
        title: 'עמקת קשרים',
        description: 'פיתוח קשרים עמוקים יותר מתוך הקשרים הקיימים.',
        actions: [
          'זהה 10 קשרים קיימים לפיתוח עומק',
          'צור הזדמנויות למפגשים משמעותיים',
          'פתח קשרים אישיים עמוקים יותר'
        ]
      },
      {
        title: 'תחזוקה',
        description: 'פיתוח מנגנונים לתחזוקת קשרים קיימים תוך המשך ההרחבה.',
        actions: [
          'צור סדר יום שבועי לתחזוקת קשרים',
          'פתח מנגנוני תקשורת',
          'צור הזדמנויות למפגשים קבועים'
        ]
      },
      {
        title: 'איזון',
        description: 'יצירת איזון בין הרחבה לעומק תוך שמירה על הגיוון.',
        actions: [
          'הגדר סדרי עדיפויות',
          'פתח אסטרטגיית איזון',
          'צור מנגנוני בקרה'
        ]
      }
    ]
  }
};

/**
 * English Content
 */
const englishContent: ReportContentConfig['en'] = {
  magnet: {
    title: 'Network Magnet',
    tagline: 'People naturally gravitate towards you',
    deepDive: [
      'You are a Network Magnet - others naturally turn to you. Your network is built on trust and high centrality.',
      'Your high centrality positions you in a significant role of influence. People feel they can trust you and share sensitive information with you.',
      'You naturally create value for others, which strengthens your position as a central anchor in the network.',
      'Your network is characterized by trust-based relationships, psychological safety, and natural connection attraction.'
    ],
    strengths: [
      'High perceived centrality - others seek you out',
      'Strong trust foundation - people trust you',
      'Natural network anchor - central entry point',
      'Creates value for others - mutual giving',
      'Psychological safety - people feel safe with you',
      'Natural connection attraction - people turn to you'
    ],
    risks: [
      {
        title: 'Overload (Burnout)',
        description: 'The risk of being a central entry point may lead to overload and burnout. It\'s important to develop decentralization mechanisms and maintain balance.'
      },
      {
        title: 'Bottleneck',
        description: 'Excessive dependency of others on you may create bottlenecks and delay processes. It\'s important to develop independence of others in the network.'
      },
      {
        title: 'Lack of Balance',
        description: 'Focus on attracting connections may neglect maintenance and deepening of existing relationships.'
      }
    ],
    recommendations: [
      {
        title: 'Strategic Maintenance',
        description: 'Developing mechanisms for maintaining quality relationships while preventing overload.',
        actions: [
          'Create a list of your 20 most important connections',
          'Allocate weekly time for strategic thinking about the network',
          'Develop a mechanism to refer others to additional connections'
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
    ]
  },
  bridge: {
    title: 'Strategic Bridge',
    tagline: 'You connect different groups and span boundaries',
    deepDive: [
      'You are a Strategic Bridge - you connect different groups and span boundaries. Your network is characterized by high diversity and brokerage.',
      'Your network is characterized by exceptional ability to connect different groups and bridge gaps. You serve as a strategic broker.',
      'You bring diverse perspectives together and create opportunities to connect different worlds.',
      'The high diversity in your network allows you to access information and opportunities from diverse sources.'
    ],
    strengths: [
      'Bridging between groups - connects different worlds',
      'High network diversity - connections from different fields',
      'Brokerage capabilities - transfers information between groups',
      'Connecting different worlds - creates opportunities',
      'Decentralization - not dependent on one group',
      'Network leadership - leads connections'
    ],
    risks: [
      {
        title: 'Over-Dispersion',
        description: 'Connection with many groups may lead to lack of depth and dispersion of resources. It\'s important to develop deeper connections while maintaining diversity.'
      },
      {
        title: 'Lack of Belonging',
        description: 'Being between groups may create a sense of not fully belonging to any group. It\'s important to develop a sense of belonging within each group.'
      },
      {
        title: 'Brokerage Overload',
        description: 'Focus on brokerage may lead to overload and burnout. It\'s important to develop balance mechanisms and preserve energy.'
      }
    ],
    recommendations: [
      {
        title: 'Deepening Connections',
        description: 'Developing deeper connections within each group while maintaining diversity.',
        actions: [
          'Map the different groups in your network',
          'Identify 3-5 key connections in each group for development',
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
    ]
  },
  gardener: {
    title: 'Network Gardener',
    tagline: 'You nurture and maintain relationships with care',
    deepDive: [
      'You are a Network Gardener - you nurture and maintain relationships with care. Your network is characterized by reciprocity and trust.',
      'Your network is characterized by careful nurturing of existing relationships and strong reciprocity. You invest in long-term relationships.',
      'You build a trust-based network where people feel safe to share and ask for help.',
      'Your strong reciprocity creates a supportive and cohesive network where people feel committed to each other.'
    ],
    strengths: [
      'Excellent relationship maintenance - maintains relationships over time',
      'Strong reciprocity - gives and receives equally',
      'Trust and reliability - people trust you',
      'Deep relational embeddedness - meaningful relationships',
      'Psychological safety - people feel safe',
      'Creates value for others - mutual giving'
    ],
    risks: [
      {
        title: 'Network Isolation',
        description: 'Over-focus on existing connections may lead to isolation from new opportunities. It\'s important to develop new connections while maintaining quality of existing relationships.'
      },
      {
        title: 'Lack of Diversity',
        description: 'A small, cohesive network may limit access to new information and opportunities. It\'s important to develop network diversity.'
      },
      {
        title: 'Mutual Dependency',
        description: 'Strong reciprocity may create mutual dependency that can limit independence. It\'s important to develop independence while maintaining reciprocity.'
      }
    ],
    recommendations: [
      {
        title: 'Network Expansion',
        description: 'Developing new connections while maintaining quality of existing relationships.',
        actions: [
          'Create a list of 10 new people you want to meet',
          'Identify 3 new areas for development',
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
    ]
  },
  pioneer: {
    title: 'Network Pioneer',
    tagline: 'You actively build and expand your network',
    deepDive: [
      'You are a Network Pioneer - you actively build and expand your network. Your network is characterized by growth and diversity.',
      'Your network is characterized by active growth and opportunity seeking. You continuously build new connections.',
      'You seek new opportunities and discover new areas for development.',
      'Your exploratory approach allows you to access information and opportunities from diverse sources.'
    ],
    strengths: [
      'Active network building - continuously creates new connections',
      'High network diversity - connections from different fields',
      'Opportunity seeking - seeks new opportunities',
      'Exploratory approach - discovers new areas',
      'Using connections - actively utilizes the network',
      'Network leadership - leads initiatives'
    ],
    risks: [
      {
        title: 'Superficial Connections',
        description: 'Over-focus on expansion may lead to superficial connections without depth. It\'s important to develop deeper connections while continuing expansion.'
      },
      {
        title: 'Neglecting Existing Connections',
        description: 'Focus on new connections may neglect existing ones. It\'s important to develop maintenance mechanisms while continuing expansion.'
      },
      {
        title: 'Resource Dispersion',
        description: 'Focus on expansion may lead to resource dispersion and lack of focus. It\'s important to develop priorities while continuing expansion.'
      }
    ],
    recommendations: [
      {
        title: 'Deepening Connections',
        description: 'Developing deeper connections from existing ones.',
        actions: [
          'Identify 10 existing connections for depth development',
          'Create opportunities for meaningful meetings',
          'Develop deeper personal connections'
        ]
      },
      {
        title: 'Maintenance',
        description: 'Developing mechanisms for maintaining existing connections while continuing expansion.',
        actions: [
          'Create a weekly schedule for connection maintenance',
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
    ]
  }
};

/**
 * Complete content configuration
 */
export const reportContentConfig: ReportContentConfig = {
  he: hebrewContent,
  en: englishContent
};

/**
 * Get content for a specific archetype and language
 */
export function getArchetypeContentConfig(
  archetypeKey: ArchetypeKey,
  language: Language
): ArchetypeContentConfig {
  return reportContentConfig[language][archetypeKey];
}

/**
 * Get all content for a specific language
 */
export function getAllArchetypeContentConfig(
  language: Language
): ReportContentConfig[typeof language] {
  return reportContentConfig[language];
}

/**
 * Helper to get content using i18n language
 */
export function getArchetypeContentByI18n(
  archetypeKey: ArchetypeKey,
  i18nLanguage: string
): ArchetypeContentConfig {
  const language: Language = i18nLanguage.startsWith('he') ? 'he' : 'en';
  return getArchetypeContentConfig(archetypeKey, language);
}
