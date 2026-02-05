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
import { useAuthStore } from '@/stores/authStore';
import { ContactsService } from '@/lib/contactsService';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Contact, ContactFormData } from '@/types/contact';
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

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      if (editingContact) {
        const { error } = await ContactsService.updateContact(editingContact.id, formData);
        if (error) throw error;
      } else {
        const { error } = await ContactsService.createContact(formData);
        if (error) throw error;
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>
                  {i18n.language === 'he' ? '⚠️ נדרש Supabase' : '⚠️ Supabase Required'}
                </CardTitle>
                <CardDescription>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">
                {i18n.language === 'he' ? 'קשרים' : 'Contacts'}
              </h1>
              <p className="text-gray-600">
                {i18n.language === 'he'
                  ? 'נהל את הרשת המקצועית שלך'
                  : 'Manage your professional network'}
              </p>
            </div>
            <Button
              onClick={handleAddContact}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {i18n.language === 'he' ? '+ הוסף קשר' : '+ Add Contact'}
            </Button>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <Input
                type="search"
                placeholder={i18n.language === 'he' ? 'חפש קשרים...' : 'Search contacts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
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
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">
                {i18n.language === 'he' ? 'טוען...' : 'Loading...'}
              </p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? (i18n.language === 'he' ? 'לא נמצאו קשרים' : 'No contacts found')
                    : (i18n.language === 'he' ? 'אין קשרים עדיין' : 'No contacts yet')}
                </p>
                {!searchQuery && (
                  <Button onClick={handleAddContact}>
                    {i18n.language === 'he' ? 'הוסף קשר ראשון' : 'Add your first contact'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{contact.full_name}</CardTitle>
                    {contact.company && (
                      <CardDescription>{contact.company}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {contact.job_title && (
                      <p className="text-sm text-gray-600">{contact.job_title}</p>
                    )}
                    {contact.email && (
                      <p className="text-sm text-blue-600">{contact.email}</p>
                    )}
                    {contact.connection_strength && (
                      <div className="flex items-center text-sm">
                        <span className="mr-2">
                          {i18n.language === 'he' ? 'עוצמה:' : 'Strength:'}
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <span key={i} className={i <= contact.connection_strength! ? 'text-blue-600' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditContact(contact)}
                        className="flex-1"
                      >
                        {i18n.language === 'he' ? 'ערוך' : 'Edit'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-700"
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContact
                ? (i18n.language === 'he' ? 'ערוך קשר' : 'Edit Contact')
                : (i18n.language === 'he' ? 'הוסף קשר חדש' : 'Add New Contact')}
            </DialogTitle>
            <DialogDescription>
              {i18n.language === 'he'
                ? 'מלא את הפרטים של הקשר'
                : 'Fill in the contact details'}
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            contact={editingContact}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingContact(null);
            }}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
