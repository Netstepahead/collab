'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { ProfileService } from '@/lib/profileService';
import { StorageService } from '@/lib/storageService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Loader2 } from 'lucide-react';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProfilePage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading) {
      if (!isSupabaseConfigured()) {
        setError(i18n.language === 'he' ? 'Supabase לא מוגדר' : 'Supabase not configured');
        setLoading(false);
        return;
      }

      if (!user) {
        router.push('/auth');
        return;
      }

      loadProfile();
    }
  }, [mounted, authLoading, user, router, i18n.language]);

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    const { profile: profileData, error: profileError } = await ProfileService.getProfile();
    
    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    if (profileData) {
      setProfile(profileData);
      setFullName(profileData.full_name || '');
      setEmail(profileData.email || user?.email || '');
      setAvatarPreview(profileData.avatar_url || null);
    } else {
      // Create profile if it doesn't exist
      const { profile: newProfile, error: createError } = await ProfileService.updateProfile({
        email: user?.email || '',
        full_name: '',
      });
      
      if (createError) {
        setError(createError.message);
      } else if (newProfile) {
        setProfile(newProfile);
        setFullName(newProfile.full_name || '');
        setEmail(newProfile.email || user?.email || '');
        setAvatarPreview(newProfile.avatar_url || null);
      }
    }
    
    setLoading(false);
  };

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
      // Create preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Store file for upload
      setAvatarFile(file);
      
      // Upload immediately if user is logged in
      if (user?.id) {
        const { url, error: uploadError } = await StorageService.uploadProfileAvatar(file, user.id);
        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          let errorMsg = i18n.language === 'he' ? 'שגיאה בהעלאת תמונה' : 'Error uploading image';
          
          if (uploadError.message?.includes('permission') || uploadError.message?.includes('policy')) {
            errorMsg = i18n.language === 'he' 
              ? 'שגיאת הרשאות. ודא שהדליים נוצרו והמדיניות הוגדרה.'
              : 'Permission error. Make sure buckets are created and policies are set up.';
          } else if (uploadError.message) {
            errorMsg = uploadError.message;
          }
          
          alert(errorMsg);
          setAvatarFile(null);
          setAvatarPreview(profile?.avatar_url || null);
        } else if (url) {
          // Update profile with new avatar URL
          const { error: updateError } = await ProfileService.updateProfile({ avatar_url: url });
          if (updateError) {
            console.error('Error updating profile:', updateError);
            alert(i18n.language === 'he' ? 'שגיאה בעדכון הפרופיל' : 'Error updating profile');
          } else {
            setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
            setSuccess(i18n.language === 'he' ? 'תמונת הפרופיל עודכנה בהצלחה' : 'Profile picture updated successfully');
            setTimeout(() => setSuccess(''), 3000);
          }
        }
      }
    } catch (error: any) {
      console.error('Error handling avatar:', error);
      alert(error?.message || (i18n.language === 'he' ? 'שגיאה בהעלאת תמונה' : 'Error uploading image'));
      setAvatarFile(null);
      setAvatarPreview(profile?.avatar_url || null);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!profile?.avatar_url) return;

    setUploadingAvatar(true);
    try {
      // Delete from storage
      await StorageService.deleteAvatar(profile.avatar_url, 'profile-avatars');
      
      // Update profile
      const { error: updateError } = await ProfileService.updateProfile({ avatar_url: null });
      if (updateError) {
        console.error('Error removing avatar:', updateError);
        alert(i18n.language === 'he' ? 'שגיאה בהסרת תמונה' : 'Error removing image');
      } else {
        setAvatarPreview(null);
        setAvatarFile(null);
        setProfile(prev => prev ? { ...prev, avatar_url: null } : null);
        setSuccess(i18n.language === 'he' ? 'תמונת הפרופיל הוסרה' : 'Profile picture removed');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      console.error('Error removing avatar:', error);
      alert(i18n.language === 'he' ? 'שגיאה בהסרת תמונה' : 'Error removing image');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { profile: updatedProfile, error: updateError } = await ProfileService.updateProfile({
        full_name: fullName || null,
        email: email || null,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      if (updatedProfile) {
        setProfile(updatedProfile);
        setSuccess(i18n.language === 'he' ? 'הפרופיל עודכן בהצלחה' : 'Profile updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || (i18n.language === 'he' ? 'שגיאה בעדכון הפרופיל' : 'Error updating profile'));
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B365D] border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-light">
            {i18n.language === 'he' ? 'טוען...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#1B365D] mb-2">
            {i18n.language === 'he' ? 'הפרופיל שלי' : 'My Profile'}
          </h1>
          <p className="text-gray-600 font-light">
            {i18n.language === 'he' ? 'נהל את פרטי הפרופיל שלך' : 'Manage your profile information'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="font-serif text-[#1B365D]">
              {i18n.language === 'he' ? 'פרטי פרופיל' : 'Profile Details'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {i18n.language === 'he' ? 'עדכן את פרטי הפרופיל שלך' : 'Update your profile information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label>{i18n.language === 'he' ? 'תמונת פרופיל' : 'Profile Picture'}</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {avatarPreview ? (
                      <div className="relative">
                        <img
                          src={avatarPreview}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-2 border-[#1B365D]/20"
                        />
                        {!uploadingAvatar && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#1B365D]/10 border-2 border-[#1B365D]/20 flex items-center justify-center">
                        <span className="text-[#1B365D] font-semibold text-2xl">
                          {fullName.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    {uploadingAvatar && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-full">
                        <Loader2 className="w-6 h-6 animate-spin text-[#1B365D]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleAvatarChange}
                      disabled={uploadingAvatar}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label
                      htmlFor="avatar-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#1B365D] text-white rounded-lg hover:bg-[#2a4d80] transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadingAvatar
                        ? (i18n.language === 'he' ? 'מעלה...' : 'Uploading...')
                        : (i18n.language === 'he' ? 'העלה תמונה' : 'Upload Image')}
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG or GIF • Max 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {i18n.language === 'he' ? 'שם מלא' : 'Full Name'}
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={i18n.language === 'he' ? 'הזן שם מלא' : 'Enter full name'}
                  className="border-[#1B365D]/20 focus:border-[#E87722] focus:ring-[#E87722]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  {i18n.language === 'he' ? 'אימייל' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={i18n.language === 'he' ? 'הזן אימייל' : 'Enter email'}
                  className="border-[#1B365D]/20 focus:border-[#E87722] focus:ring-[#E87722]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#1B365D] hover:bg-[#2a4d80] text-white"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {i18n.language === 'he' ? 'שומר...' : 'Saving...'}
                    </>
                  ) : (
                    i18n.language === 'he' ? 'שמור שינויים' : 'Save Changes'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
                >
                  {i18n.language === 'he' ? 'ביטול' : 'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
