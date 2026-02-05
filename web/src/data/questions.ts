// Questionnaire questions in both English and Hebrew
import { Question } from '@/types/questionnaire';

export const questions: Record<'en' | 'he', Question[]> = {
  en: [
    // Skill 1: Building Contacts (New Contacts)
    { id: 1, text: "I initiate introductions with new people relevant to my work.", skill: 1 },
    { id: 2, text: "I proactively join meetings or forums to meet new people.", skill: 1 },
    { id: 3, text: "When I meet a new person in the organization or outside it, I try to create a lasting professional connection with them.", skill: 1 },
    
    // Skill 2: Maintaining Contacts
    { id: 4, text: "I maintain contact with people I worked with in the past, even after the project ended.", skill: 2 },
    { id: 5, text: "I make sure to check in periodically with important colleagues, even without an immediate need.", skill: 2 },
    { id: 6, text: "I invest time in nurturing long-term relationships with significant people in my network.", skill: 2 },
    
    // Skill 3: Deepening Relationships
    { id: 7, text: "When I need information or help, I know who to turn to in my network.", skill: 3 },
    { id: 8, text: "I turn to my contacts to advance projects, ideas, or opportunities.", skill: 3 },
    { id: 9, text: "I ask people in my network to connect me with additional people who can help.", skill: 3 },
    
    // Skill 4: Strategic Networking
    { id: 10, text: "I have active connections with people from very different fields or departments than mine.", skill: 4 },
    { id: 11, text: "My network includes people from different backgrounds, cultures, or groups.", skill: 4 },
    { id: 12, text: "When I reach out to people in my network, they come from a wide variety of roles and professions.", skill: 4 },
    
    // Skill 5: Network Diversity
    { id: 13, text: "I make sure not to rely on only one person or one group as a source of information or support.", skill: 5 },
    { id: 14, text: "I have several different connection hubs that I can turn to.", skill: 5 },
    { id: 15, text: "If a central person in my network leaves, I still have someone to turn to.", skill: 5 },
    
    // Skill 6: Reciprocity
    { id: 16, text: "I don't just receive help from others, but also give help in return.", skill: 6 },
    { id: 17, text: "When someone supports me, I try to find a way to support them in return.", skill: 6 },
    { id: 18, text: "My connections are based on mutual giving and receiving.", skill: 6 },
    
    // Skill 7: Trust & Reliability
    { id: 19, text: "People feel they can trust me and share sensitive information with me.", skill: 7 },
    { id: 20, text: "I keep my word, even when it requires additional effort from me.", skill: 7 },
    { id: 21, text: "I avoid sharing information that might harm others.", skill: 7 },
    
    // Skill 8: Open Communication
    { id: 22, text: "People around me feel comfortable admitting mistakes.", skill: 8 },
    { id: 23, text: "I invite others to express opinions even if they differ from mine.", skill: 8 },
    { id: 24, text: "I approach \"unripe\" ideas with curiosity rather than judgment.", skill: 8 },
    
    // Skill 9: Information Brokerage
    { id: 25, text: "I connect people or teams that don't tend to work together.", skill: 9 },
    { id: 26, text: "I transfer important information from one group to another in the organization.", skill: 9 },
    { id: 27, text: "I feel that I serve as a bridge between different worlds in the organization.", skill: 9 },
    
    // Skill 10: Network Centrality
    { id: 28, text: "People often turn to me for consultation.", skill: 10 },
    { id: 29, text: "I find myself at the center of conversations or connections between people.", skill: 10 },
    { id: 30, text: "New people in the organization come to me for guidance.", skill: 10 },
    
    // Skill 11: Providing Value
    { id: 31, text: "I ensure that professional connections are beneficial to the other side as well.", skill: 11 },
    { id: 32, text: "I share knowledge or opportunities that can help others.", skill: 11 },
    { id: 33, text: "When I identify an opportunity that suits someone else, I connect them to it.", skill: 11 },
    
    // Skill 12: Influence & Leadership
    { id: 34, text: "I take a leading role in promoting joint initiatives.", skill: 12 },
    { id: 35, text: "When a good idea comes up, I help gather people around it.", skill: 12 },
    { id: 36, text: "People see me as an informal leader in my field of work.", skill: 12 }
  ],
  
  he: [
    // Skill 1: Building Contacts (New Contacts)
    { id: 1, text: "אני יוזם.ת היכרות עם אנשים חדשים הרלוונטיים לעבודתי", skill: 1 },
    { id: 2, text: "אני מצטרף.ת ביוזמתי למפגשים או פורומים כדי להכיר אנשים חדשים", skill: 1 },
    { id: 3, text: "כשאני פוגש.ת אדם חדש בארגון או מחוץ לו, אני מנסה ליצור איתו קשר מקצועי מתמשך", skill: 1 },
    
    // Skill 2: Maintaining Contacts
    { id: 4, text: "אני שומר.ת על קשר עם אנשים שעבדתי איתם בעבר, גם כשהפרויקט הסתיים", skill: 2 },
    { id: 5, text: "אני מקפיד.ה להתעדכן מדי פעם עם קולגות חשובים, גם בלי צורך מיידי", skill: 2 },
    { id: 6, text: "אני משקיע.ה זמן בטיפוח קשרים ארוכי טווח עם אנשים משמעותיים ברשת שלי", skill: 2 },
    
    // Skill 3: Deepening Relationships
    { id: 7, text: "כשאני זקוק.ה למידע או עזרה, אני יודע.ת למי לפנות ברשת שלי", skill: 3 },
    { id: 8, text: "אני פונה לקשרים שלי כדי לקדם פרויקטים, רעיונות או הזדמנויות", skill: 3 },
    { id: 9, text: "אני מבקש.ת מאנשים ברשת שלי לחבר אותי לאנשים נוספים שיכולים לעזור", skill: 3 },
    
    // Skill 4: Strategic Networking
    { id: 10, text: "יש לי קשרים פעילים עם אנשים מתחומים או מחלקות שונות מאוד משלי", skill: 4 },
    { id: 11, text: "הרשת שלי כוללת אנשים מרקעים, תרבויות או קבוצות שונות", skill: 4 },
    { id: 12, text: "כשאני פונה לאנשים ברשת, הם מגיעים ממגוון רחב של תפקידים ומקצועות", skill: 4 },
    
    // Skill 5: Network Diversity
    { id: 13, text: "אני מקפיד.ה שלא להישען רק על אדם אחד או קבוצה אחת כמקור מידע או תמיכה", skill: 5 },
    { id: 14, text: "יש לי כמה מוקדי קשרים שונים שאליהם אני יכול.ה לפנות", skill: 5 },
    { id: 15, text: "אם אדם מרכזי ברשת שלי עוזב, עדיין יש לי למי לפנות", skill: 5 },
    
    // Skill 6: Reciprocity
    { id: 16, text: "אני לא רק מקבל.ת עזרה מאחרים, אלא גם נותן.ת עזרה בחזרה", skill: 6 },
    { id: 17, text: "כשמישהו תומך בי, אני משתדל.ת למצוא דרך לתמוך בו בעתיד", skill: 6 },
    { id: 18, text: "הקשרים שלי מבוססים על נתינה וקבלה הדדית", skill: 6 },
    
    // Skill 7: Trust & Reliability
    { id: 19, text: "אנשים מרגישים שהם יכולים לסמוך עליי ולשתף אותי במידע רגיש", skill: 7 },
    { id: 20, text: "אני עומד.ת במילה שלי, גם כשזה דורש ממני מאמץ נוסף", skill: 7 },
    { id: 21, text: "אני נמנע.ת מלשתף מידע שעלול לפגוע באחר", skill: 7 },
    
    // Skill 8: Open Communication
    { id: 22, text: "אנשים סביבי מרגישים בנוח להודות בטעויות", skill: 8 },
    { id: 23, text: "אני מזמין.ה אחרים להביע דעה גם אם היא שונה משלי", skill: 8 },
    { id: 24, text: "אני מתייחס.ת לרעיונות \"לא בשלים\" מתוך סקרנות ולא שיפוטיות", skill: 8 },
    
    // Skill 9: Information Brokerage
    { id: 25, text: "אני מחבר.ת בין אנשים או צוותים שלא נוטים לעבוד יחד", skill: 9 },
    { id: 26, text: "אני מעביר.ה מידע חשוב מקבוצה אחת לאחרת בארגון", skill: 9 },
    { id: 27, text: "אני מרגיש.ה שאני משמש.ת כגשר בין עולמות שונים בארגון", skill: 9 },
    
    // Skill 10: Network Centrality
    { id: 28, text: "אנשים פונים אליי לעיתים קרובות להתייעצות", skill: 10 },
    { id: 29, text: "אני מוצא.ת את עצמי במרכז שיחות או חיבורים בין אנשים", skill: 10 },
    { id: 30, text: "אנשים חדשים בארגון מגיעים אליי לקבל הכוונה", skill: 10 },
    
    // Skill 11: Providing Value
    { id: 31, text: "אני דואג.ת שקשרים מקצועיים יהיו מועילים גם לצד השני", skill: 11 },
    { id: 32, text: "אני חולק.ת ידע או הזדמנויות שיכולים לעזור לאחרים", skill: 11 },
    { id: 33, text: "כשאני מזהה הזדמנות שמתאימה למישהו אחר, אני מחבר.ת אותו אליה", skill: 11 },
    
    // Skill 12: Influence & Leadership
    { id: 34, text: "אני נוטל.ת תפקיד מוביל בקידום יוזמות משותפות", skill: 12 },
    { id: 35, text: "כשעולה רעיון טוב, אני עוזר.ת לגייס אנשים סביבו", skill: 12 },
    { id: 36, text: "אנשים רואים בי דמות מובילה לא רשמית בתחום עבודתי", skill: 12 }
  ]
};

// Skill names for reference
export const skillNames = {
  en: {
    1: "Building Contacts",
    2: "Maintaining Contacts",
    3: "Using Connections",
    4: "Network Diversity",
    5: "Network Decentralization",
    6: "Reciprocity",
    7: "Trust & Reliability",
    8: "Psychological Safety",
    9: "Information Brokerage",
    10: "Network Centrality",
    11: "Providing Value",
    12: "Network Leadership"
  },
  he: {
    1: "בניית קשרים",
    2: "תחזוקת קשרים",
    3: "שימוש בקשרים",
    4: "גיוון רשת",
    5: "ביזוריות רשת",
    6: "הדדיות",
    7: "אמון ומהימנות",
    8: "ביטחון פסיכולוגי",
    9: "תיווך מידע",
    10: "מרכזיות רשתית",
    11: "מתן ערך",
    12: "מנהיגות רשתית"
  }
};
