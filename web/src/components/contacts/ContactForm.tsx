'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactFormData, Contact } from '@/types/contact';

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContactForm({ contact, onSubmit, onCancel, isLoading }: ContactFormProps) {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: contact?.full_name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    job_title: contact?.job_title || '',
    relationship_type: contact?.relationship_type || undefined,
    connection_strength: contact?.connection_strength || undefined,
    last_contact_date: contact?.last_contact_date || undefined,
    notes: contact?.notes || '',
    tags: contact?.tags || [],
    common_ground: contact?.common_ground || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">
          {i18n.language === 'he' ? 'שם מלא' : 'Full Name'} *
        </Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
          placeholder={i18n.language === 'he' ? 'הזן שם מלא' : 'Enter full name'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {i18n.language === 'he' ? 'אימייל' : 'Email'}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={i18n.language === 'he' ? 'הזן אימייל' : 'Enter email'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {i18n.language === 'he' ? 'טלפון' : 'Phone'}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={i18n.language === 'he' ? 'הזן טלפון' : 'Enter phone'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">
            {i18n.language === 'he' ? 'חברה' : 'Company'}
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder={i18n.language === 'he' ? 'הזן חברה' : 'Enter company'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_title">
            {i18n.language === 'he' ? 'תפקיד' : 'Job Title'}
          </Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
            placeholder={i18n.language === 'he' ? 'הזן תפקיד' : 'Enter job title'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="relationship_type">
            {i18n.language === 'he' ? 'סוג קשר' : 'Relationship Type'}
          </Label>
          <Select
            value={formData.relationship_type}
            onValueChange={(value: any) => setFormData({ ...formData, relationship_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={i18n.language === 'he' ? 'בחר סוג קשר' : 'Select type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">
                {i18n.language === 'he' ? 'מקצועי' : 'Professional'}
              </SelectItem>
              <SelectItem value="personal">
                {i18n.language === 'he' ? 'אישי' : 'Personal'}
              </SelectItem>
              <SelectItem value="family">
                {i18n.language === 'he' ? 'משפחה' : 'Family'}
              </SelectItem>
              <SelectItem value="other">
                {i18n.language === 'he' ? 'אחר' : 'Other'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="connection_strength">
            {i18n.language === 'he' ? 'עוצמת קשר (1-5)' : 'Connection Strength (1-5)'}
          </Label>
          <Select
            value={formData.connection_strength?.toString()}
            onValueChange={(value) => setFormData({ ...formData, connection_strength: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder={i18n.language === 'he' ? 'בחר עוצמה' : 'Select strength'} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} - {num === 1 ? (i18n.language === 'he' ? 'חלש' : 'Weak') :
                    num === 3 ? (i18n.language === 'he' ? 'בינוני' : 'Medium') :
                    num === 5 ? (i18n.language === 'he' ? 'חזק' : 'Strong') : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="common_ground">
          {i18n.language === 'he' ? 'מכנה משותף' : 'Common Ground'}
        </Label>
        <Input
          id="common_ground"
          value={formData.common_ground}
          onChange={(e) => setFormData({ ...formData, common_ground: e.target.value })}
          placeholder={i18n.language === 'he' ? 'למשל: אוניברסיטה, תחביבים משותפים' : 'e.g., University, shared hobbies'}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          {i18n.language === 'he' ? 'הערות' : 'Notes'}
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder={i18n.language === 'he' ? 'הערות נוספות' : 'Additional notes'}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          {i18n.language === 'he' ? 'ביטול' : 'Cancel'}
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading
            ? (i18n.language === 'he' ? 'שומר...' : 'Saving...')
            : contact
            ? (i18n.language === 'he' ? 'עדכן' : 'Update')
            : (i18n.language === 'he' ? 'הוסף' : 'Add')}
        </Button>
      </div>
    </form>
  );
}
