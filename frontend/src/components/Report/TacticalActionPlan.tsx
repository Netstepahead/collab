import React, { useState } from 'react';
import { CheckCircle2, Target, Users, TrendingUp, Award } from 'lucide-react';

interface Action {
  id: string;
  text: string;
  category: string;
}

interface TacticalActionPlanProps {
  actions?: Action[];
  userName?: string;
  isRTL?: boolean;
}

const TacticalActionPlan: React.FC<TacticalActionPlanProps> = ({ actions = [], userName, isRTL = false }) => {
  const [myGoal, setMyGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [signature, setSignature] = useState('');

  // Default actions if none provided
  const defaultActions: Action[] = [
    {
      id: '1',
      text: isRTL 
        ? 'צור רשימה של 20 הקשרים החשובים ביותר שלך והקצה זמן שבועי לטיפוח שלושה מהם'
        : 'Create a list of your top 20 most important connections and dedicate weekly time to nurture three of them',
      category: isRTL ? 'תחזוקה' : 'Maintenance'
    },
    {
      id: '2',
      text: isRTL
        ? 'זהה שני אנשים ברשת שלך שיכולים להפיק תועלת מקשר ביניהם והצע חיבור'
        : 'Identify two people in your network who could benefit from connecting and facilitate an introduction',
      category: isRTL ? 'ביזוריות' : 'Decentralization'
    },
    {
      id: '3',
      text: isRTL
        ? 'הגדר שעות זמינות ברורות לפגישות רשת והקפד לשמור על זמן לעבודה ממוקדת'
        : 'Set clear availability hours for network meetings and protect time for focused work',
      category: isRTL ? 'גבולות' : 'Boundaries'
    },
    {
      id: '4',
      text: isRTL
        ? 'בחר מיומנות רשתית אחת לשיפור החודש ותרגל אותה באופן מכוון'
        : 'Choose one network skill to improve this month and practice it deliberately',
      category: isRTL ? 'פיתוח' : 'Development'
    },
    {
      id: '5',
      text: isRTL
        ? 'קבע ביקורת רבעונית של הרשת שלך כדי להעריך איכות קשרים ולזהות פערים'
        : 'Schedule a quarterly review of your network to assess connection quality and identify gaps',
      category: isRTL ? 'מעקב' : 'Tracking'
    }
  ];

  const displayActions = Array.isArray(actions) && actions.length > 0 ? actions : defaultActions;
  const actionIcons = [Target, Users, TrendingUp, Award, CheckCircle2];

  return (
    <div className={`min-h-screen bg-[#FDFBF7] flex items-center justify-center p-8 print:p-0 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div 
        className="bg-[#FDFBF7] w-full max-w-[210mm] shadow-lg print:shadow-none overflow-hidden"
      >
        <div className="flex flex-col p-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#1F3A60] mb-2">
              {isRTL ? 'תוכנית פעולה טקטית ✓' : 'Tactical Action Plan ✓'}
            </h1>
            <p className="text-base text-[#1F3A60]/70 font-medium">
              {isRTL ? 'Concrete Steps for Network Development' : 'צעדים קונקרטיים לפיתוח הרשת'}
            </p>
            <p className="text-sm text-[#5A6A7A] mt-3 leading-relaxed">
              {isRTL
                ? 'הפעולות הבאות נבחרו במיוחד עבורך על בסיס הפרופיל הרשתי שלך. בחר 2-3 פעולות להתחלה.'
                : 'The following actions are specifically selected for you based on your network profile. Start with 2-3 actions.'}
            </p>
          </header>

          {/* Action Checklist */}
          <div className="actions-list">
            {displayActions.slice(0, 5).map((action, idx) => {
              const Icon = actionIcons[idx % actionIcons.length];
              
              return (
                <div 
                  key={action?.id || idx}
                  className="action-card"
                >
                  <div className="action-card-header">
                    <div className="action-icon-wrapper">
                      <CheckCircle2 className="action-icon" />
                    </div>
                    <div className="action-header-content">
                      <div className="action-meta">
                        <Icon className="action-category-icon" />
                        <span className="action-category">{action?.category || 'Action'}</span>
                        <span className="action-number">#{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                  <p className="action-card-description">{action?.text || ''}</p>
                </div>
              );
            })}
          </div>

          {/* Commitment Worksheet */}
          <div className="bg-white rounded-xl border-2 border-dashed border-[#1F3A60]/30 p-6 shadow-sm">
            <h3 className={`text-lg font-bold text-[#1F3A60] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '📋 התחייבות אישית' : '📋 Personal Commitment'}
            </h3>
            
            <div className="space-y-4">
              {/* My Goal */}
              <div>
                <label className={`block text-sm font-semibold text-[#1F3A60] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'המטרה שלי:' : 'My Goal:'}
                </label>
                <div className="border-b-2 border-dashed border-[#E5E7EB] pb-1">
                  <input
                    type="text"
                    value={myGoal}
                    onChange={(e) => setMyGoal(e.target.value)}
                    placeholder={isRTL ? 'לדוגמה: לחזק 5 קשרים מרכזיים במהלך החודש הקרוב' : 'e.g., Strengthen 5 key connections over the next month'}
                    className={`w-full bg-transparent text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </div>

              {/* Date & Signature Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Target Date */}
                <div>
                  <label className={`block text-sm font-semibold text-[#1F3A60] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'תאריך יעד:' : 'Target Date:'}
                  </label>
                  <div className="border-b-2 border-dashed border-[#E5E7EB] pb-1">
                    <input
                      type="text"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      placeholder={isRTL ? 'dd/mm/yyyy' : 'mm/dd/yyyy'}
                      className={`w-full bg-transparent text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>

                {/* Signature */}
                <div>
                  <label className={`block text-sm font-semibold text-[#1F3A60] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'חתימה:' : 'Signature:'}
                  </label>
                  <div className="border-b-2 border-dashed border-[#E5E7EB] pb-1">
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder={userName || (isRTL ? 'שם מלא' : 'Full name')}
                      className={`w-full bg-transparent text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none italic ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Commitment Statement */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <p className={`text-xs text-[#5A6A7A] italic leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL
                    ? 'אני מתחייב לפעול לפי תוכנית זו ולהקדיש זמן לפיתוח היכולות הרשתיות שלי.'
                    : 'I commit to following this plan and dedicating time to developing my network capabilities.'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-6 pt-4 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#9CA3AF] text-center">
              {isRTL 
                ? 'שתף את התוכנית עם מנטור או עמית לאחריות הדדית'
                : 'Share this plan with a mentor or colleague for mutual accountability'}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TacticalActionPlan;
