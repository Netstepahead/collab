'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { Interaction, InteractionFormData } from '@/types/contact';

interface InteractionFormProps {
  contactId: string;
  interaction?: Interaction | null;
  onSubmit: (data: InteractionFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function InteractionForm({ contactId, interaction, onSubmit, onCancel, isLoading }: InteractionFormProps) {
  const { i18n } = useTranslation();
  
  const getInitialFormData = (): InteractionFormData => ({
    interaction_date: interaction?.interaction_date || new Date().toISOString().split('T')[0],
    interaction_type: interaction?.interaction_type || 'meeting',
    notes: interaction?.notes || '',
  });

  const [formData, setFormData] = useState<InteractionFormData>(getInitialFormData());

  // Reset form when interaction changes
  useEffect(() => {
    const initialData = getInitialFormData();
    setFormData(initialData);
  }, [interaction?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const interactionTypeOptions = [
    { value: 'meeting', label: i18n.language === 'he' ? 'פגישה' : 'Meeting' },
    { value: 'call', label: i18n.language === 'he' ? 'שיחה' : 'Call' },
    { value: 'email', label: i18n.language === 'he' ? 'אימייל' : 'Email' },
    { value: 'message', label: i18n.language === 'he' ? 'הודעה' : 'Message' },
    { value: 'event', label: i18n.language === 'he' ? 'אירוע' : 'Event' },
    { value: 'other', label: i18n.language === 'he' ? 'אחר' : 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="interaction_date">
            {i18n.language === 'he' ? 'תאריך' : 'Date'} *
          </Label>
          <Input
            id="interaction_date"
            type="date"
            value={formData.interaction_date}
            onChange={(e) => setFormData({ ...formData, interaction_date: e.target.value })}
            required
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interaction_type">
            {i18n.language === 'he' ? 'סוג אינטראקציה' : 'Interaction Type'} *
          </Label>
          <Select
            value={formData.interaction_type}
            onValueChange={(value: any) => setFormData({ ...formData, interaction_type: value })}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={i18n.language === 'he' ? 'בחר סוג' : 'Select type'} />
            </SelectTrigger>
            <SelectContent>
              {interactionTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          {i18n.language === 'he' ? 'הערות' : 'Notes'}
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder={i18n.language === 'he' ? 'הוסף הערות על האינטראקציה...' : 'Add notes about the interaction...'}
          rows={4}
          className="bg-white"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          {i18n.language === 'he' ? 'ביטול' : 'Cancel'}
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {i18n.language === 'he' ? 'שומר...' : 'Saving...'}
            </>
          ) : interaction ? (
            i18n.language === 'he' ? 'עדכן' : 'Update'
          ) : (
            i18n.language === 'he' ? 'הוסף' : 'Add'
          )}
        </Button>
      </div>
    </form>
  );
}
