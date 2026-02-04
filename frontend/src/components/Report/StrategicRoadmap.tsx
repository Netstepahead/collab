import React from 'react';
import { RefreshCw, Share2, Shield, ArrowRight } from 'lucide-react';

interface Pillar {
  title: string;
  description: string;
  actions: string[];
}

interface StrategicRoadmapProps {
  pillars?: Pillar[];
  recommendations?: Array<{ title?: string; description?: string; actions?: string[] }>;
  isRTL?: boolean;
}

const StrategicRoadmap: React.FC<StrategicRoadmapProps> = ({ pillars, recommendations, isRTL = false }) => {
  // Convert recommendations to pillars format if needed
  let displayPillars: Pillar[] = [];
  if (pillars && pillars.length > 0) {
    displayPillars = pillars;
  } else if (recommendations && recommendations.length > 0) {
    displayPillars = recommendations.map(rec => ({
      title: rec?.title || '',
      description: rec?.description || '',
      actions: rec?.actions || []
    }));
  }

  // Default pillars if no data provided
  const defaultPillars: Pillar[] = [
    {
      title: isRTL ? 'תחזוקה אסטרטגית' : 'Strategic Maintenance',
      description: isRTL 
        ? 'פיתוח מנגנונים לשמירה על קשרים איכותיים תוך מניעת עומס יתר.'
        : 'Develop mechanisms for maintaining quality connections while preventing overload.',
      actions: [
        isRTL ? 'צור רשימה של 20 הקשרים החשובים ביותר שלך' : 'Create a list of your top 20 most important connections',
        isRTL ? 'הקצה זמן שבועי לחשיבה אסטרטגית על הרשת' : 'Allocate weekly time for strategic network thinking',
        isRTL ? 'פתח מנגנון להפניה של אחרים לקשרים נוספים' : 'Develop a referral mechanism for connecting others'
      ]
    },
    {
      title: isRTL ? 'ביזוריות' : 'Decentralization',
      description: isRTL
        ? 'פיתוח יכולת להפנות אחרים לקשרים נוספים במקום להיות נקודת כניסה יחידה.'
        : 'Develop the ability to refer others to additional connections instead of being the sole entry point.',
      actions: [
        isRTL ? 'יצירת קשרים בין אנשים ברשת' : 'Create connections between people in your network',
        isRTL ? 'פיתוח יכולת הפניה' : 'Develop referral capabilities',
        isRTL ? 'בניית רשתות משנה' : 'Build sub-networks'
      ]
    },
    {
      title: isRTL ? 'ניהול עומס' : 'Load Management',
      description: isRTL
        ? 'שמירה על איזון בין זמינות לאחרים לבין הגנה על הזמן והאנרגיה שלך.'
        : 'Maintain balance between availability to others and protecting your time and energy.',
      actions: [
        isRTL ? 'הגדר גבולות ברורים לזמינות' : 'Set clear availability boundaries',
        isRTL ? 'למד לומר "לא" באופן מכבד' : 'Learn to say "no" respectfully',
        isRTL ? 'פתח מערכת סינון לבקשות' : 'Develop a request filtering system'
      ]
    }
  ];

  const finalPillars = displayPillars.length > 0 ? displayPillars : defaultPillars;

  const icons = [RefreshCw, Share2, Shield];
  const borderColors = ['border-t-[#1F3A60]', 'border-t-[#FBAF3F]', 'border-t-[#1F3A60]'];

  return (
    <div className={`min-h-screen bg-[#FDFBF7] flex items-center justify-center p-8 print:p-0 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div 
        className="bg-[#FDFBF7] w-full max-w-[210mm] shadow-lg print:shadow-none overflow-hidden"
        style={{ aspectRatio: '210 / 297' }}
      >
        <div className="h-full flex flex-col p-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#1F3A60] mb-2">
              {isRTL ? 'מפת דרכים אסטרטגית' : 'Strategic Roadmap'}
            </h1>
            <p className="text-base text-[#1F3A60]/70 font-medium">
              {isRTL ? 'Three Pillars for Network Excellence' : 'שלושת עמודי התווך למצוינות רשתית'}
            </p>
          </header>

          {/* Three Pillars */}
          <div className="flex-1 grid grid-cols-3 gap-6 mb-8">
            {finalPillars.slice(0, 3).map((pillar, index) => {
              const Icon = icons[index % icons.length];
              const borderColor = borderColors[index % borderColors.length];
              
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-lg shadow-sm border-t-4 ${borderColor} p-6 flex flex-col`}
                >
                  {/* Icon & Title */}
                  <div className={`flex items-start gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-10 h-10 bg-[#1F3A60]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1F3A60]" />
                    </div>
                    <h3 className={`text-lg font-bold text-[#1F3A60] leading-tight flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {pillar?.title || `Pillar ${index + 1}`}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-sm text-[#5A6A7A] leading-relaxed mb-4 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {pillar?.description || ''}
                  </p>

                  {/* Actions */}
                  {pillar?.actions && pillar.actions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className={`text-xs font-semibold text-[#1F3A60]/60 uppercase tracking-wide mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? 'פעולות' : 'Actions'}
                      </h4>
                      <ul className="space-y-1.5">
                        {pillar.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className={`flex items-start gap-2 text-xs text-[#5A6A7A] ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                            <span className="text-[#FBAF3F] mt-0.5 flex-shrink-0">{isRTL ? '◄' : '►'}</span>
                            <span className="leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continuous Growth Flow */}
          <div className="bg-gradient-to-r from-[#1F3A60]/5 via-[#FBAF3F]/10 to-[#1F3A60]/5 rounded-xl p-6">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-3 h-3 bg-[#1F3A60] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-[#1F3A60]">
                  {isRTL ? 'צמיחה מתמשכת' : 'Continuous Growth'}
                </span>
                <ArrowRight className={`w-5 h-5 text-[#FBAF3F] ${isRTL ? 'rotate-180' : ''}`} />
                <span className="text-sm font-semibold text-[#FBAF3F]">
                  {isRTL ? 'שיפור מתמיד' : 'Ongoing Improvement'}
                </span>
                <ArrowRight className={`w-5 h-5 text-[#1F3A60] ${isRTL ? 'rotate-180' : ''}`} />
                <span className="text-sm font-semibold text-[#1F3A60]">
                  {isRTL ? 'מצוינות רשתית' : 'Network Excellence'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#9CA3AF] text-center">
              {isRTL 
                ? 'מומלץ להתמקד בעמוד אחד בכל פעם ולבנות הרגלים לפני מעבר לעמוד הבא'
                : 'Focus on one pillar at a time and build habits before moving to the next'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicRoadmap;
