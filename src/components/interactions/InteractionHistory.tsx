'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Mail, MessageSquare, CalendarDays, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { Interaction } from '@/types/contact';
import { format } from 'date-fns';

interface InteractionHistoryProps {
  interactions: Interaction[];
  onEdit?: (interaction: Interaction) => void;
  onDelete?: (interactionId: string) => void;
  isLoading?: boolean;
}

const interactionIcons = {
  meeting: Calendar,
  call: Phone,
  email: Mail,
  message: MessageSquare,
  event: CalendarDays,
  other: MoreHorizontal,
};

const interactionColors = {
  meeting: 'bg-blue-100 text-blue-700 border-blue-200',
  call: 'bg-green-100 text-green-700 border-green-200',
  email: 'bg-purple-100 text-purple-700 border-purple-200',
  message: 'bg-orange-100 text-orange-700 border-orange-200',
  event: 'bg-pink-100 text-pink-700 border-pink-200',
  other: 'bg-gray-100 text-gray-700 border-gray-200',
};

export function InteractionHistory({ interactions, onEdit, onDelete, isLoading }: InteractionHistoryProps) {
  const { i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, i18n.language === 'he' ? 'dd/MM/yyyy' : 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const getInteractionTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; he: string }> = {
      meeting: { en: 'Meeting', he: 'פגישה' },
      call: { en: 'Call', he: 'שיחה' },
      email: { en: 'Email', he: 'אימייל' },
      message: { en: 'Message', he: 'הודעה' },
      event: { en: 'Event', he: 'אירוע' },
      other: { en: 'Other', he: 'אחר' },
    };
    return labels[type]?.[i18n.language] || type;
  };

  if (isLoading) {
    return (
      <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
        <CardContent className="py-8 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-[#1B365D] border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-light text-sm">
            {i18n.language === 'he' ? 'טוען אינטראקציות...' : 'Loading interactions...'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (interactions.length === 0) {
    return (
      <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
        <CardContent className="py-8 text-center">
          <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-light">
            {i18n.language === 'he' ? 'אין אינטראקציות עדיין' : 'No interactions yet'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {i18n.language === 'he' ? 'הוסף אינטראקציה ראשונה כדי להתחיל לעקוב אחר ההיסטוריה' : 'Add your first interaction to start tracking history'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-[#1B365D]">
          {i18n.language === 'he' ? 'היסטוריית אינטראקציות' : 'Interaction History'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interactions.map((interaction) => {
            const Icon = interactionIcons[interaction.interaction_type] || MoreHorizontal;
            const colorClass = interactionColors[interaction.interaction_type] || interactionColors.other;

            return (
              <div
                key={interaction.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-[#1B365D]/10 bg-white hover:shadow-sm transition-shadow"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#1B365D]">
                          {getInteractionTypeLabel(interaction.interaction_type)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(interaction.interaction_date)}
                        </span>
                      </div>
                      {interaction.notes && (
                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                          {interaction.notes}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    {(onEdit || onDelete) && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(interaction)}
                            className="h-8 w-8 p-0 text-gray-600 hover:text-[#1B365D] hover:bg-[#1B365D]/5"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(interaction.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
