'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ContactForm } from '@/components/contacts/ContactForm';
import { ImportDialog } from '@/components/contacts/ImportDialog';
import { useAuthStore } from '@/stores/authStore';
import { ContactsService } from '@/lib/contactsService';
import { StorageService } from '@/lib/storageService';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Contact, ContactFormData } from '@/types/contact';
import { Upload } from 'lucide-react';
import '@/lib/i18n';

export default function ContactsPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, loading: authLoading } = useAuthStore();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (mounted && !authLoading && isSupabaseConfigured() && !user) {
      router.push('/auth');
    }
  }, [mounted, authLoading, user, router]);

  useEffect(() => {
    if (user && isSupabaseConfigured()) {
      loadContacts();
    }
  }, [user]);

  const loadContacts = async () => {
    setLoading(true);
    const { data, error } = await ContactsService.getContacts();
    
    if (error) {
      setError(error.message);
    } else if (data) {
      setContacts(data);
    }
    setLoading(false);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsDialogOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (formData: ContactFormData, avatarFile?: File | null) => {
    setIsSubmitting(true);
    setError('');

    try {
      let contactId: string;
      
      if (editingContact) {
        // Update existing contact
        const { error } = await ContactsService.updateContact(editingContact.id, formData);
        if (error) throw error;
        contactId = editingContact.id;
      } else {
        // Create new contact first (without avatar_url if it's just a filename marker)
        const dataToSave = { ...formData };
        if (dataToSave.avatar_url && !dataToSave.avatar_url.startsWith('http')) {
          delete dataToSave.avatar_url; // Remove temporary marker
        }
        
        const { data, error } = await ContactsService.createContact(dataToSave);
        if (error) throw error;
        if (!data) throw new Error('Failed to create contact');
        contactId = data.id;
      }

      // Upload avatar if file was selected (for new contacts or when updating)
      if (avatarFile && contactId) {
        const { url, error: uploadError } = await StorageService.uploadContactAvatar(avatarFile, contactId);
        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          // Don't fail the whole operation if avatar upload fails
        } else if (url) {
          // Update contact with avatar URL
          await ContactsService.updateContact(contactId, { avatar_url: url });
        }
      }

      await loadContacts();
      setIsDialogOpen(false);
      setEditingContact(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStrengthUpdate = async (contactId: string, strength: number) => {
    try {
      const { error } = await ContactsService.updateContact(contactId, { connection_strength: strength });
      if (error) {
        setError(error.message);
      } else {
        await loadContacts();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm(i18n.language === 'he' ? 'האם למחוק קשר זה?' : 'Delete this contact?')) {
      return;
    }

    const { error } = await ContactsService.deleteContact(id);
    if (error) {
      setError(error.message);
    } else {
      await loadContacts();
    }
  };

  const handleImport = async (contacts: ContactFormData[]) => {
    setIsSubmitting(true);
    setError('');

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const contactData of contacts) {
        const { error } = await ContactsService.createContact(contactData);
        if (error) {
          errorCount++;
        } else {
          successCount++;
        }
      }

      await loadContacts();
      
      if (errorCount > 0) {
        setError(
          i18n.language === 'he'
            ? `יובאו ${successCount} קשרים, ${errorCount} נכשלו`
            : `Imported ${successCount} contacts, ${errorCount} failed`
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted || authLoading) {
    return null;
  }

  // If Supabase not configured, show fallback UI
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] network-bg">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
              <CardHeader>
                <CardTitle className="font-serif text-[#1B365D]">
                  {i18n.language === 'he' ? '⚠️ נדרש Supabase' : '⚠️ Supabase Required'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {i18n.language === 'he'
                    ? 'על מנת להשתמש ב-CRM, יש להגדיר Supabase. ראה README לפרטים.'
                    : 'To use the CRM, you need to configure Supabase. See README for details.'}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] network-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D]">
                {i18n.language === 'he' ? 'קשרים' : 'Contacts'}
              </h1>
              <p className="text-gray-600 font-light">
                {i18n.language === 'he'
                  ? 'נהל את הרשת המקצועית שלך'
                  : 'Manage your professional network'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsImportDialogOpen(true)}
                variant="outline"
                className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
              >
                <Upload className="w-4 h-4 mr-2" />
                {i18n.language === 'he' ? 'ייבא' : 'Import'}
              </Button>
              <Button
                onClick={handleAddContact}
                className="bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg"
              >
                {i18n.language === 'he' ? '+ הוסף קשר' : '+ Add Contact'}
              </Button>
            </div>
          </div>

          {/* Search */}
          <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
            <CardContent className="pt-6">
              <Input
                type="search"
                placeholder={i18n.language === 'he' ? 'חפש קשרים...' : 'Search contacts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md border-[#1B365D]/20 focus:border-[#1B365D] focus:ring-[#1B365D]/20"
              />
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}

          {/* Contacts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B365D] border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-light">
                {i18n.language === 'he' ? 'טוען...' : 'Loading...'}
              </p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 mb-4 font-light">
                  {searchQuery
                    ? (i18n.language === 'he' ? 'לא נמצאו קשרים' : 'No contacts found')
                    : (i18n.language === 'he' ? 'אין קשרים עדיין' : 'No contacts yet')}
                </p>
                {!searchQuery && (
                  <Button 
                    onClick={handleAddContact}
                    className="bg-[#1B365D] hover:bg-[#2a4d80] text-white"
                  >
                    {i18n.language === 'he' ? 'הוסף קשר ראשון' : 'Add your first contact'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-card transition-smooth border-[#1B365D]/10 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {contact.avatar_url ? (
                          <img
                            src={contact.avatar_url}
                            alt={contact.full_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#1B365D]/20"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-12 h-12 rounded-full bg-[#1B365D]/10 border-2 border-[#1B365D]/20 flex items-center justify-center ${contact.avatar_url ? 'hidden' : ''}`}>
                          <span className="text-[#1B365D] font-semibold text-lg">
                            {contact.full_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-serif text-[#1B365D] truncate">{contact.full_name}</CardTitle>
                        {contact.company && (
                          <CardDescription className="text-gray-600 truncate">{contact.company}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contact.job_title && (
                      <p className="text-sm text-gray-600 font-light">{contact.job_title}</p>
                    )}
                    {contact.email && (
                      <p className="text-sm text-[#1B365D] truncate">{contact.email}</p>
                    )}
                    {/* Quick Strength Update */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-light">
                          {i18n.language === 'he' ? 'עוצמה:' : 'Strength:'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {contact.connection_strength || '—'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleQuickStrengthUpdate(contact.id, i)}
                            className={`transition-all duration-200 ${
                              i <= (contact.connection_strength || 0)
                                ? 'text-[#E87722] scale-110'
                                : 'text-gray-300 hover:text-gray-400'
                            }`}
                            title={`${i18n.language === 'he' ? 'לחץ לעדכון' : 'Click to update'} ${i}`}
                          >
                            <span className="text-lg">★</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditContact(contact)}
                        className="flex-1 border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
                      >
                        {i18n.language === 'he' ? 'ערוך' : 'Edit'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {i18n.language === 'he' ? 'מחק' : 'Delete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) {
          // Reset everything when dialog closes
          setEditingContact(null);
          setError('');
        }
        setIsDialogOpen(open);
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#1B365D]/10">
          <DialogHeader>
            <DialogTitle className="font-serif text-[#1B365D]">
              {editingContact
                ? (i18n.language === 'he' ? 'ערוך קשר' : 'Edit Contact')
                : (i18n.language === 'he' ? 'הוסף קשר חדש' : 'Add New Contact')}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {i18n.language === 'he'
                ? 'מלא את הפרטים של הקשר'
                : 'Fill in the contact details'}
            </DialogDescription>
          </DialogHeader>
          {isDialogOpen && (
            <ContactForm
              key={`${editingContact?.id || 'new'}-${isDialogOpen}`} // Force remount when switching between add/edit or reopening
              contact={editingContact}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingContact(null);
                setError('');
              }}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
      />
    </div>
  );
}
