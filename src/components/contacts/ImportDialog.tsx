'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { parseCSV, parseExcel, mapColumnsToContacts, autoDetectMapping, type ImportRow, type ColumnMapping, type ParsedContact } from '@/lib/csvImport';
import type { ContactFormData } from '@/types/contact';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (contacts: ContactFormData[]) => Promise<void>;
}

export function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const { i18n } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [parsedContacts, setParsedContacts] = useState<ParsedContact[]>([]);
  const [step, setStep] = useState<'upload' | 'map' | 'preview'>('upload');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');
    setLoading(true);

    try {
      let parsedRows: ImportRow[];
      
      if (selectedFile.name.endsWith('.csv')) {
        parsedRows = await parseCSV(selectedFile);
      } else if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        parsedRows = await parseExcel(selectedFile);
      } else {
        throw new Error(i18n.language === 'he' 
          ? 'סוג קובץ לא נתמך. אנא בחר קובץ CSV או Excel.'
          : 'Unsupported file type. Please select a CSV or Excel file.');
      }

      if (parsedRows.length === 0) {
        throw new Error(i18n.language === 'he'
          ? 'הקובץ ריק או לא מכיל נתונים'
          : 'File is empty or contains no data');
      }

      setRows(parsedRows);
      
      // Extract headers
      const fileHeaders = Object.keys(parsedRows[0] || {});
      setHeaders(fileHeaders);
      
      // Auto-detect mapping
      const autoMapping = autoDetectMapping(fileHeaders);
      setMapping(autoMapping);
      
      // If full_name is detected, move to preview, otherwise to mapping
      if (autoMapping.full_name) {
        const contacts = mapColumnsToContacts(parsedRows, autoMapping);
        setParsedContacts(contacts);
        setStep('preview');
      } else {
        setStep('map');
      }
    } catch (err: any) {
      setError(err.message || (i18n.language === 'he' ? 'שגיאה בקריאת הקובץ' : 'Error reading file'));
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  const handleMappingChange = (field: keyof ColumnMapping, column: string) => {
    setMapping({ ...mapping, [field]: column });
  };

  const handlePreview = () => {
    const contacts = mapColumnsToContacts(rows, mapping);
    if (contacts.length === 0) {
      setError(i18n.language === 'he'
        ? 'לא נמצאו קשרים תקינים. ודא שמפה עמודת "שם מלא".'
        : 'No valid contacts found. Make sure "Full Name" column is mapped.');
      return;
    }
    setParsedContacts(contacts);
    setStep('preview');
    setError('');
  };

  const handleImport = async () => {
    if (parsedContacts.length === 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Convert ParsedContact to ContactFormData
      const contactsToImport: ContactFormData[] = parsedContacts.map((contact) => ({
        full_name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        job_title: contact.job_title,
        relationship_type: contact.relationship_type as any,
        connection_strength: contact.connection_strength,
        common_ground: contact.common_ground,
        notes: contact.notes,
        tags: [],
      }));

      await onImport(contactsToImport);
      handleClose();
    } catch (err: any) {
      setError(err.message || (i18n.language === 'he' ? 'שגיאה בייבוא' : 'Error importing'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setRows([]);
    setHeaders([]);
    setMapping({});
    setParsedContacts([]);
    setStep('upload');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-[#1B365D]/10">
        <DialogHeader>
          <DialogTitle className="font-serif text-[#1B365D]">
            {i18n.language === 'he' ? 'ייבוא קשרים' : 'Import Contacts'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {i18n.language === 'he'
              ? 'ייבא קשרים מקובץ CSV או Excel'
              : 'Import contacts from CSV or Excel file'}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {step === 'upload' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">
                {i18n.language === 'he' ? 'בחר קובץ' : 'Select File'}
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B365D] file:text-white hover:file:bg-[#2a4d80] file:cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                {i18n.language === 'he'
                  ? 'תומך בקבצי CSV ו-Excel (.csv, .xlsx, .xls)'
                  : 'Supports CSV and Excel files (.csv, .xlsx, .xls)'}
              </p>
            </div>
            {loading && (
              <div className="text-center py-4">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#1B365D] border-r-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">
                  {i18n.language === 'he' ? 'קורא קובץ...' : 'Reading file...'}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 'map' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {i18n.language === 'he'
                ? 'מפה את העמודות מהקובץ לשדות הקשר:'
                : 'Map columns from file to contact fields:'}
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{i18n.language === 'he' ? 'שם מלא *' : 'Full Name *'}</Label>
                  <Select
                    value={mapping.full_name || ''}
                    onValueChange={(value) => handleMappingChange('full_name', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.language === 'he' ? 'בחר עמודה' : 'Select column'} />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{i18n.language === 'he' ? 'אימייל' : 'Email'}</Label>
                  <Select
                    value={mapping.email || ''}
                    onValueChange={(value) => handleMappingChange('email', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.language === 'he' ? 'אופציונלי' : 'Optional'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{i18n.language === 'he' ? 'ללא' : 'None'}</SelectItem>
                      {headers.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{i18n.language === 'he' ? 'טלפון' : 'Phone'}</Label>
                  <Select
                    value={mapping.phone || ''}
                    onValueChange={(value) => handleMappingChange('phone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.language === 'he' ? 'אופציונלי' : 'Optional'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{i18n.language === 'he' ? 'ללא' : 'None'}</SelectItem>
                      {headers.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{i18n.language === 'he' ? 'חברה' : 'Company'}</Label>
                  <Select
                    value={mapping.company || ''}
                    onValueChange={(value) => handleMappingChange('company', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.language === 'he' ? 'אופציונלי' : 'Optional'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{i18n.language === 'he' ? 'ללא' : 'None'}</SelectItem>
                      {headers.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep('upload')}>
                {i18n.language === 'he' ? 'חזור' : 'Back'}
              </Button>
              <Button onClick={handlePreview} disabled={!mapping.full_name}>
                {i18n.language === 'he' ? 'תצוגה מקדימה' : 'Preview'}
              </Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {i18n.language === 'he'
                ? `נמצאו ${parsedContacts.length} קשרים לייבוא:`
                : `Found ${parsedContacts.length} contacts to import:`}
            </p>
            <div className="max-h-64 overflow-y-auto border border-[#1B365D]/10 rounded-lg p-4 bg-[#FAF9F6]/50">
              <div className="space-y-2">
                {parsedContacts.slice(0, 10).map((contact, idx) => (
                  <div key={idx} className="text-sm text-gray-700 py-1 border-b border-[#1B365D]/5 last:border-0">
                    <span className="font-medium">{contact.full_name}</span>
                    {contact.email && <span className="text-gray-500 ml-2">({contact.email})</span>}
                    {contact.company && <span className="text-gray-500 ml-2">- {contact.company}</span>}
                  </div>
                ))}
                {parsedContacts.length > 10 && (
                  <p className="text-xs text-gray-500 pt-2">
                    {i18n.language === 'he'
                      ? `ועוד ${parsedContacts.length - 10} קשרים...`
                      : `and ${parsedContacts.length - 10} more contacts...`}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep('map')}>
                {i18n.language === 'he' ? 'חזור' : 'Back'}
              </Button>
              <Button onClick={handleImport} disabled={loading || parsedContacts.length === 0}>
                {loading
                  ? (i18n.language === 'he' ? 'מייבא...' : 'Importing...')
                  : (i18n.language === 'he' ? `ייבא ${parsedContacts.length} קשרים` : `Import ${parsedContacts.length} contacts`)}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
