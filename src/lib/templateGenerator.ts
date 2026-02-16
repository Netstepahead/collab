// Template generator for contact imports
import * as XLSX from 'xlsx';

export interface TemplateRow {
  'Full Name': string;
  'Email': string;
  'Phone': string;
  'Company': string;
  'Job Title': string;
  'Relationship Type': string;
  'Connection Strength': string;
  'Common Ground': string;
  'Notes': string;
}

/**
 * Generate a CSV template file
 */
export function generateCSVTemplate(): string {
  const headers = [
    'Full Name',
    'Email',
    'Phone',
    'Company',
    'Job Title',
    'Relationship Type',
    'Connection Strength',
    'Common Ground',
    'Notes',
  ];

  // Create example rows with instructions
  const exampleRows: TemplateRow[] = [
    {
      'Full Name': 'John Doe',
      'Email': 'john.doe@example.com',
      'Phone': '+1-555-0123',
      'Company': 'Acme Corp',
      'Job Title': 'Software Engineer',
      'Relationship Type': 'professional',
      'Connection Strength': '3',
      'Common Ground': 'Met at tech conference',
      'Notes': 'Interested in collaboration',
    },
    {
      'Full Name': 'Jane Smith',
      'Email': 'jane.smith@example.com',
      'Phone': '+1-555-0456',
      'Company': 'Tech Startup',
      'Job Title': 'Product Manager',
      'Relationship Type': 'professional',
      'Connection Strength': '4',
      'Common Ground': 'Alumni from same university',
      'Notes': 'Follow up next month',
    },
  ];

  // Build CSV content
  const csvRows = [
    headers.join(','),
    ...exampleRows.map((row) =>
      headers.map((header) => {
        const value = row[header as keyof TemplateRow] || '';
        // Escape commas and quotes in CSV
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ),
  ];

  return csvRows.join('\n');
}

/**
 * Generate an Excel template file
 */
export function generateExcelTemplate(): Blob {
  const headers = [
    'Full Name',
    'Email',
    'Phone',
    'Company',
    'Job Title',
    'Relationship Type',
    'Connection Strength',
    'Common Ground',
    'Notes',
  ];

  // Create example rows with instructions
  const exampleRows: TemplateRow[] = [
    {
      'Full Name': 'John Doe',
      'Email': 'john.doe@example.com',
      'Phone': '+1-555-0123',
      'Company': 'Acme Corp',
      'Job Title': 'Software Engineer',
      'Relationship Type': 'professional',
      'Connection Strength': '3',
      'Common Ground': 'Met at tech conference',
      'Notes': 'Interested in collaboration',
    },
    {
      'Full Name': 'Jane Smith',
      'Email': 'jane.smith@example.com',
      'Phone': '+1-555-0456',
      'Company': 'Tech Startup',
      'Job Title': 'Product Manager',
      'Relationship Type': 'professional',
      'Connection Strength': '4',
      'Common Ground': 'Alumni from same university',
      'Notes': 'Follow up next month',
    },
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([...exampleRows], { header: headers });

  // Set column widths
  const colWidths = [
    { wch: 20 }, // Full Name
    { wch: 30 }, // Email
    { wch: 15 }, // Phone
    { wch: 20 }, // Company
    { wch: 20 }, // Job Title
    { wch: 20 }, // Relationship Type
    { wch: 20 }, // Connection Strength
    { wch: 30 }, // Common Ground
    { wch: 40 }, // Notes
  ];
  worksheet['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

  // Convert to blob
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

/**
 * Download template file
 */
export function downloadTemplate(format: 'csv' | 'xlsx'): void {
  if (format === 'csv') {
    const csvContent = generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contacts_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    const blob = generateExcelTemplate();
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contacts_template.xlsx');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
