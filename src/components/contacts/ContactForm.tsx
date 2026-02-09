'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactFormData, Contact } from '@/types/contact';
import { StorageService } from '@/lib/storageService';
import { Camera, X } from 'lucide-react';

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: ContactFormData, avatarFile?: File | null) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContactForm({ contact, onSubmit, onCancel, isLoading }: ContactFormProps) {
  const { i18n } = useTranslation();
  
  // Initialize form data based on contact prop
  const getInitialFormData = (): ContactFormData => ({
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
    avatar_url: contact?.avatar_url || undefined,
  });

  const [formData, setFormData] = useState<ContactFormData>(getInitialFormData());
  const [avatarPreview, setAvatarPreview] = useState<string | null>(contact?.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when contact changes (switching between add/edit modes)
  useEffect(() => {
    const initialData = getInitialFormData();
    setFormData(initialData);
    setAvatarPreview(contact?.avatar_url || null);
    setAvatarFile(null);
  }, [contact?.id]); // Reset when contact ID changes (or becomes undefined for new contact)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(i18n.language === 'he' ? 'אנא בחר קובץ תמונה' : 'Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(i18n.language === 'he' ? 'קובץ גדול מדי. מקסימום 5MB' : 'File too large. Maximum 5MB');
      return;
    }

    setUploadingAvatar(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Store file for upload (will be uploaded after contact creation/update)
      setAvatarFile(file);
      
      // If editing existing contact, upload immediately
      if (contact?.id) {
        setUploadingAvatar(true);
        const { url, error } = await StorageService.uploadContactAvatar(file, contact.id);
        if (error) {
          console.error('Error uploading avatar:', error);
          alert(i18n.language === 'he' ? 'שגיאה בהעלאת תמונה' : 'Error uploading image');
          setAvatarFile(null);
          setAvatarPreview(contact.avatar_url || null);
        } else if (url) {
          setFormData({ ...formData, avatar_url: url });
        }
        setUploadingAvatar(false);
      }
    } catch (error) {
      console.error('Error handling avatar:', error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setFormData({ ...formData, avatar_url: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, avatarFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Avatar Upload */}
      <div className="space-y-2">
        <Label>{i18n.language === 'he' ? 'תמונת פרופיל' : 'Profile Picture'}</Label>
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarPreview ? (
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#1B365D]/20"
                />
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#1B365D]/10 border-2 border-dashed border-[#1B365D]/30 flex items-center justify-center">
                <Camera className="w-8 h-8 text-[#1B365D]/40" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
            >
              {uploadingAvatar
                ? (i18n.language === 'he' ? 'מעלה...' : 'Uploading...')
                : (i18n.language === 'he' ? 'העלה תמונה' : 'Upload Image')}
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              {i18n.language === 'he' ? 'JPG, PNG או GIF. מקסימום 5MB' : 'JPG, PNG or GIF. Max 5MB'}
            </p>
          </div>
        </div>
      </div>

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
          className="bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg"
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
