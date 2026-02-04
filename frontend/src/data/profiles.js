// Profile definitions and descriptions
// Based on Network Capabilities Profile methodology

export const profiles = {
  en: {
    magnet: {
      name: "Network Magnet",
      key: "magnet",
      description: "You are a Network Magnet - others naturally turn to you. You combine high perceived centrality with trust, making you a natural anchor in your network.",
      coreIndicators: ["Attracting Connections", "Trust"],
      supportingIndicators: ["Psychological Safety", "Creating Value for Others"],
      reinforcingIndicators: ["Bridging Groups", "Using Connections"],
      strengths: [
        "High perceived centrality - others seek you out",
        "Strong trust foundation",
        "Natural network anchor",
        "Creates value for others"
      ],
      challenges: [
        "Consider strategic relationship management",
        "Balance breadth with depth",
        "Ensure you're not overextended"
      ]
    },
    bridge: {
      name: "Strategic Bridge",
      key: "bridge",
      description: "You are a Strategic Bridge - you connect different groups and span boundaries. You excel at brokerage and bringing diverse perspectives together.",
      coreIndicators: ["Bridging Groups", "Diversity"],
      supportingIndicators: ["Decentralization", "Using Connections"],
      reinforcingIndicators: ["Network Leadership"],
      strengths: [
        "Excellent at connecting different groups",
        "High network diversity",
        "Strong boundary spanning capabilities",
        "Brings diverse perspectives together"
      ],
      challenges: [
        "Maintain balance between groups",
        "Ensure you're not spread too thin",
        "Focus on strategic connections"
      ]
    },
    gardener: {
      name: "Network Gardener",
      key: "gardener",
      description: "You are a Network Gardener - you nurture and maintain relationships with care. You excel at relational embeddedness and reciprocity.",
      coreIndicators: ["Maintaining Contacts", "Reciprocity"],
      supportingIndicators: ["Trust", "Psychological Safety"],
      reinforcingIndicators: ["Creating Value for Others"],
      strengths: [
        "Excellent relationship maintenance",
        "Strong reciprocity",
        "Deep relational embeddedness",
        "Trustworthy and reliable"
      ],
      challenges: [
        "Expand network diversity",
        "Increase network activity",
        "Build new connections"
      ]
    },
    pioneer: {
      name: "Network Pioneer",
      key: "pioneer",
      description: "You are a Network Pioneer - you actively build and expand your network. You seek opportunities and explore new connections.",
      coreIndicators: ["Building Contacts", "Diversity"],
      supportingIndicators: ["Using Connections", "Bridging Groups"],
      reinforcingIndicators: ["Network Leadership"],
      strengths: [
        "Active network building",
        "High network diversity",
        "Opportunity seeking",
        "Exploratory approach"
      ],
      challenges: [
        "Focus on maintaining existing relationships",
        "Develop deeper connections",
        "Balance expansion with depth"
      ]
    }
  },
  he: {
    magnet: {
      name: "מוקד משיכה רשתית",
      key: "magnet",
      description: "אתה מוקד משיכה רשתית - אחרים פונים אליך ביוזמתם. אתה משלב מרכזיות נתפסת גבוהה עם אמון, מה שהופך אותך לעגן טבעי ברשת שלך.",
      coreIndicators: ["משיכת קשרים", "אמון"],
      supportingIndicators: ["ביטחון פסיכולוגי", "יצירת ערך לאחרים"],
      reinforcingIndicators: ["גישור בין קבוצות", "שימוש בקשרים"],
      strengths: [
        "מרכזיות נתפסת גבוהה - אחרים מחפשים אותך",
        "יסוד אמון חזק",
        "עגן טבעי ברשת",
        "יוצר ערך לאחרים"
      ],
      challenges: [
        "שקול ניהול אסטרטגי של קשרים",
        "אזן בין רוחב לעומק",
        "ודא שאתה לא מתפזר מדי"
      ]
    },
    bridge: {
      name: "מגשר אסטרטגי",
      key: "bridge",
      description: "אתה מגשר אסטרטגי - אתה מחבר בין קבוצות שונות וחוצה גבולות. אתה מצטיין בתיווך ובחיבור בין פרספקטיבות מגוונות.",
      coreIndicators: ["גישור בין קבוצות", "גיוון"],
      supportingIndicators: ["ביזוריות", "שימוש בקשרים"],
      reinforcingIndicators: ["מנהיגות פנים-רשתית"],
      strengths: [
        "מצוין בחיבור בין קבוצות שונות",
        "גיוון רשת גבוה",
        "יכולות גבוליות חזקות",
        "מביא פרספקטיבות מגוונות יחד"
      ],
      challenges: [
        "שמור על איזון בין קבוצות",
        "ודא שאתה לא מתפזר מדי",
        "התמקד בקשרים אסטרטגיים"
      ]
    },
    gardener: {
      name: "מטפח רשתות",
      key: "gardener",
      description: "אתה מטפח רשתות - אתה מטפח ושומר על קשרים בקפידה. אתה מצטיין בהטמעה יחסית והדדיות.",
      coreIndicators: ["תחזוקת קשרים", "הדדיות"],
      supportingIndicators: ["אמון", "ביטחון פסיכולוגי"],
      reinforcingIndicators: ["יצירת ערך לאחרים"],
      strengths: [
        "תחזוקת קשרים מצוינת",
        "הדדיות חזקה",
        "הטמעה יחסית עמוקה",
        "אמין ומהימן"
      ],
      challenges: [
        "הרחב את מגוון הרשת",
        "הגבר את פעילות הרשת",
        "בנה קשרים חדשים"
      ]
    },
    pioneer: {
      name: "חלוץ רשתות",
      key: "pioneer",
      description: "אתה חלוץ רשתות - אתה בונה ומרחיב את הרשת שלך באופן פעיל. אתה מחפש הזדמנויות ומגלה קשרים חדשים.",
      coreIndicators: ["בניית קשרים", "גיוון"],
      supportingIndicators: ["שימוש בקשרים", "גישור בין קבוצות"],
      reinforcingIndicators: ["מנהיגות פנים-רשתית"],
      strengths: [
        "בניית רשת פעילה",
        "גיוון רשת גבוה",
        "חיפוש הזדמנויות",
        "גישה חוקרת"
      ],
      challenges: [
        "התמקד בשמירה על קשרים קיימים",
        "פתח קשרים עמוקים יותר",
        "אזן בין הרחבה לעומק"
      ]
    }
  }
};
