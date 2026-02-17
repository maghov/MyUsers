export interface User {
  id: string;
  countryCode: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  externalCompany: boolean;
  companyName: string;
  externalEmail: string;
  internalManager: string;
  startDate: string;
  endDate: string;
  title: string;
  jobRole: string;
  employment: string;
  active: boolean;
}

export type CreateUserPayload = Omit<User, 'id' | 'active' | 'employment'>;

export const JOB_ROLES = [
  'Developer',
  'Designer',
  'Project Manager',
  'Business Analyst',
  'QA Engineer',
  'DevOps Engineer',
  'Scrum Master',
  'Product Owner',
  'Consultant',
  'Architect',
] as const;

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Intern',
] as const;

export const COMPANIES = [
  'TechCorp AB',
  'Nordic Solutions',
  'Sopra Steria',
  'Accenture',
  'Capgemini',
  'Bouvet',
  'Computas',
  'Knowit',
  'Webstep',
  'Miles',
] as const;

export const MANAGERS = [
  'Kari Nordmann',
  'Per Berg',
  'Ingrid Olsen',
  'Thomas Eriksen',
  'Maria Larsen',
] as const;

export const COUNTRY_CODES = [
  { code: '+47', country: 'Norway' },
  { code: '+46', country: 'Sweden' },
  { code: '+45', country: 'Denmark' },
  { code: '+358', country: 'Finland' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'United States' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+91', country: 'India' },
] as const;
