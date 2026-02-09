// CSV/Excel import utilities
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { ContactFormData } from '@/types/contact';

export interface ImportRow {
  [key: string]: string | number | undefined;
}

export interface ColumnMapping {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  relationship_type?: string;
  connection_strength?: string;
  common_ground?: string;
  notes?: string;
}

export interface ParsedContact {
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  relationship_type?: string;
  connection_strength?: number;
  common_ground?: string;
  notes?: string;
}

// Parse CSV file
export function parseCSV(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as ImportRow[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Parse Excel file
export function parseExcel(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData as ImportRow[]);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
}

// Map columns to contact fields
export function mapColumnsToContacts(
  rows: ImportRow[],
  mapping: ColumnMapping
): ParsedContact[] {
  return rows
    .map((row) => {
      const contact: ParsedContact = {
        full_name: '',
      };

      // Map each field
      if (mapping.full_name && row[mapping.full_name]) {
        contact.full_name = String(row[mapping.full_name]).trim();
      }

      if (mapping.email && row[mapping.email]) {
        contact.email = String(row[mapping.email]).trim() || undefined;
      }

      if (mapping.phone && row[mapping.phone]) {
        contact.phone = String(row[mapping.phone]).trim() || undefined;
      }

      if (mapping.company && row[mapping.company]) {
        contact.company = String(row[mapping.company]).trim() || undefined;
      }

      if (mapping.job_title && row[mapping.job_title]) {
        contact.job_title = String(row[mapping.job_title]).trim() || undefined;
      }

      if (mapping.relationship_type && row[mapping.relationship_type]) {
        const value = String(row[mapping.relationship_type]).toLowerCase().trim();
        if (['professional', 'personal', 'family', 'other'].includes(value)) {
          contact.relationship_type = value;
        }
      }

      if (mapping.connection_strength && row[mapping.connection_strength]) {
        const strength = parseInt(String(row[mapping.connection_strength]));
        if (strength >= 1 && strength <= 5) {
          contact.connection_strength = strength;
        }
      }

      if (mapping.common_ground && row[mapping.common_ground]) {
        contact.common_ground = String(row[mapping.common_ground]).trim() || undefined;
      }

      if (mapping.notes && row[mapping.notes]) {
        contact.notes = String(row[mapping.notes]).trim() || undefined;
      }

      // Only return contacts with at least a name
      return contact.full_name ? contact : null;
    })
    .filter((contact): contact is ParsedContact => contact !== null);
}

// Auto-detect column mapping based on common column names
export function autoDetectMapping(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};
  const lowerHeaders = headers.map((h) => h.toLowerCase().trim());

  // Common variations for each field
  const nameVariations = ['name', 'full name', 'fullname', 'contact name', 'person'];
  const emailVariations = ['email', 'e-mail', 'email address', 'mail'];
  const phoneVariations = ['phone', 'telephone', 'mobile', 'cell', 'phone number'];
  const companyVariations = ['company', 'organization', 'org', 'employer', 'workplace'];
  const jobVariations = ['title', 'job title', 'position', 'role', 'job'];
  const typeVariations = ['type', 'relationship type', 'category', 'relation'];
  const strengthVariations = ['strength', 'connection strength', 'relationship strength', 'rating'];
  const groundVariations = ['common ground', 'common', 'shared', 'connection'];
  const notesVariations = ['notes', 'note', 'comments', 'comment', 'description'];

  lowerHeaders.forEach((header, index) => {
    const originalHeader = headers[index];
    
    if (nameVariations.some((v) => header.includes(v)) && !mapping.full_name) {
      mapping.full_name = originalHeader;
    } else if (emailVariations.some((v) => header.includes(v)) && !mapping.email) {
      mapping.email = originalHeader;
    } else if (phoneVariations.some((v) => header.includes(v)) && !mapping.phone) {
      mapping.phone = originalHeader;
    } else if (companyVariations.some((v) => header.includes(v)) && !mapping.company) {
      mapping.company = originalHeader;
    } else if (jobVariations.some((v) => header.includes(v)) && !mapping.job_title) {
      mapping.job_title = originalHeader;
    } else if (typeVariations.some((v) => header.includes(v)) && !mapping.relationship_type) {
      mapping.relationship_type = originalHeader;
    } else if (strengthVariations.some((v) => header.includes(v)) && !mapping.connection_strength) {
      mapping.connection_strength = originalHeader;
    } else if (groundVariations.some((v) => header.includes(v)) && !mapping.common_ground) {
      mapping.common_ground = originalHeader;
    } else if (notesVariations.some((v) => header.includes(v)) && !mapping.notes) {
      mapping.notes = originalHeader;
    }
  });

  return mapping;
}
