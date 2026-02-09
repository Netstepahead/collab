'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InteractionForm } from '@/components/interactions/InteractionForm';
import { InteractionHistory } from '@/components/interactions/InteractionHistory';
import { useAuthStore } from '@/stores/authStore';
import { ContactsService } from '@/lib/contactsService';
import { InteractionsService } from '@/lib/interactionsService';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Contact, Interaction, InteractionFormData } from '@/types/contact';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import '@/lib/i18n';

export default function ContactDetailPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;
  
  const [mounted, setMounted] = useState(false);
  const { user, loading: authLoading } = useAuthStore();
  
  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [interactionsLoading, setInteractionsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false);
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null);
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
    if (user && isSupabaseConfigured() && contactId) {
      loadContact();
      loadInteractions();
    }
  }, [user, contactId]);

  const loadContact = async () => {
    setLoading(true);
    const { data, error } = await ContactsService.getContact(contactId);
    
    if (error) {
      setError(error.message);
    } else if (data) {
      setContact(data);
    } else {
      setError(i18n.language === 'he' ? 'קשר לא נמצא' : 'Contact not found');
    }
    setLoading(false);
  };

  const loadInteractions = async () => {
    setInteractionsLoading(true);
    const { data, error } = await InteractionsService.getContactInteractions(contactId);
    
    if (error) {
      console.error('Error loading interactions:', error);
    } else if (data) {
      setInteractions(data);
    }
    setInteractionsLoading(false);
  };

  const handleAddInteraction = () => {
    setEditingInteraction(null);
    setIsInteractionDialogOpen(true);
  };

  const handleEditInteraction = (interaction: Interaction) => {
    setEditingInteraction(interaction);
    setIsInteractionDialogOpen(true);
  };

  const handleDeleteInteraction = async (interactionId: string) => {
    if (!confirm(i18n.language === 'he' ? 'האם אתה בטוח שברצונך למחוק אינטראקציה זו?' : 'Are you sure you want to delete this interaction?')) {
      return;
    }

    const { error } = await InteractionsService.deleteInteraction(interactionId);
    if (error) {
      alert(error.message);
    } else {
      loadInteractions();
      loadContact(); // Reload contact to update last_contact_date
    }
  };

  const handleSubmitInteraction = async (formData: InteractionFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      if (editingInteraction) {
        const { error } = await InteractionsService.updateInteraction(editingInteraction.id, formData);
        if (error) throw error;
      } else {
        const { error } = await InteractionsService.createInteraction(contactId, formData);
        if (error) throw error;
      }

      setIsInteractionDialogOpen(false);
      setEditingInteraction(null);
      loadInteractions();
      loadContact(); // Reload contact to update last_contact_date
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || authLoading) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B365D] border-r-transparent"></div>
            <p className="mt-4 text-gray-600 font-light">
              {i18n.language === 'he' ? 'טוען...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4 font-light">{error || (i18n.language === 'he' ? 'קשר לא נמצא' : 'Contact not found')}</p>
              <Button onClick={() => router.push('/contacts')} className="bg-[#1B365D] hover:bg-[#2a4d80] text-white">
                {i18n.language === 'he' ? 'חזור לקשרים' : 'Back to Contacts'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/contacts')}
          className="mb-6 text-[#1B365D] hover:bg-[#1B365D]/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {i18n.language === 'he' ? 'חזור לקשרים' : 'Back to Contacts'}
        </Button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info Card */}
          <div className="lg:col-span-1">
            <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {contact.avatar_url ? (
                    <img
                      src={contact.avatar_url}
                      alt={contact.full_name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#1B365D]/20"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#1B365D]/10 border-2 border-[#1B365D]/20 flex items-center justify-center">
                      <span className="text-[#1B365D] font-semibold text-2xl">
                        {contact.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-xl font-serif text-[#1B365D]">{contact.full_name}</CardTitle>
                    {contact.company && (
                      <p className="text-sm text-gray-600 mt-1">{contact.company}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {contact.job_title && (
                  <div>
                    <p className="text-sm text-gray-500">{i18n.language === 'he' ? 'תפקיד' : 'Job Title'}</p>
                    <p className="text-sm text-[#1B365D] font-medium">{contact.job_title}</p>
                  </div>
                )}
                {contact.email && (
                  <div>
                    <p className="text-sm text-gray-500">{i18n.language === 'he' ? 'אימייל' : 'Email'}</p>
                    <p className="text-sm text-[#1B365D]">{contact.email}</p>
                  </div>
                )}
                {contact.phone && (
                  <div>
                    <p className="text-sm text-gray-500">{i18n.language === 'he' ? 'טלפון' : 'Phone'}</p>
                    <p className="text-sm text-[#1B365D]">{contact.phone}</p>
                  </div>
                )}
                {contact.connection_strength && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{i18n.language === 'he' ? 'עוצמת קשר' : 'Connection Strength'}</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <= contact.connection_strength! ? 'text-[#E87722]' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {contact.last_contact_date && (
                  <div>
                    <p className="text-sm text-gray-500">{i18n.language === 'he' ? 'קשר אחרון' : 'Last Contact'}</p>
                    <p className="text-sm text-[#1B365D]">
                      {new Date(contact.last_contact_date).toLocaleDateString(i18n.language === 'he' ? 'he-IL' : 'en-US')}
                    </p>
                  </div>
                )}
                <div className="pt-4 border-t border-[#1B365D]/10">
                  <Button
                    onClick={() => router.push(`/contacts?edit=${contact.id}`)}
                    variant="outline"
                    className="w-full border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {i18n.language === 'he' ? 'ערוך קשר' : 'Edit Contact'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactions Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#1B365D]">
                {i18n.language === 'he' ? 'אינטראקציות' : 'Interactions'}
              </h2>
              <Button
                onClick={handleAddInteraction}
                className="bg-[#1B365D] hover:bg-[#2a4d80] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {i18n.language === 'he' ? 'הוסף אינטראקציה' : 'Add Interaction'}
              </Button>
            </div>

            <InteractionHistory
              interactions={interactions}
              onEdit={handleEditInteraction}
              onDelete={handleDeleteInteraction}
              isLoading={interactionsLoading}
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Interaction Dialog */}
      <Dialog open={isInteractionDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setEditingInteraction(null);
          setError('');
        }
        setIsInteractionDialogOpen(open);
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#1B365D]/10">
          <DialogHeader>
            <DialogTitle className="font-serif text-[#1B365D]">
              {editingInteraction
                ? (i18n.language === 'he' ? 'ערוך אינטראקציה' : 'Edit Interaction')
                : (i18n.language === 'he' ? 'הוסף אינטראקציה חדשה' : 'Add New Interaction')}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {i18n.language === 'he'
                ? 'הוסף פרטים על האינטראקציה עם הקשר'
                : 'Add details about the interaction with this contact'}
            </DialogDescription>
          </DialogHeader>
          {isInteractionDialogOpen && (
            <InteractionForm
              key={`${editingInteraction?.id || 'new'}-${isInteractionDialogOpen}`}
              contactId={contactId}
              interaction={editingInteraction}
              onSubmit={handleSubmitInteraction}
              onCancel={() => {
                setIsInteractionDialogOpen(false);
                setEditingInteraction(null);
                setError('');
              }}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
