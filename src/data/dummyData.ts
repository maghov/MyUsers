import { User, CreateUserPayload } from '../types';

let users: User[] = [
  {
    id: '1',
    countryCode: '+47',
    mobileNumber: '98765432',
    firstName: 'Ola',
    lastName: 'Nordmann',
    externalCompany: false,
    companyName: '',
    externalEmail: 'ola.nordmann@example.com',
    internalManager: 'Kari Nordmann',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    title: 'Senior Developer',
    jobRole: 'Developer',
    employment: 'Full-time',
    active: true,
  },
  {
    id: '2',
    countryCode: '+46',
    mobileNumber: '70123456',
    firstName: 'Erik',
    lastName: 'Svensson',
    externalCompany: true,
    companyName: 'TechCorp AB',
    externalEmail: 'erik.svensson@techcorp.se',
    internalManager: 'Kari Nordmann',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    title: 'UX Consultant',
    jobRole: 'Consultant',
    employment: 'Contract',
    active: true,
  },
  {
    id: '3',
    countryCode: '+47',
    mobileNumber: '41234567',
    firstName: 'Lise',
    lastName: 'Hansen',
    externalCompany: false,
    companyName: '',
    externalEmail: 'lise.hansen@example.com',
    internalManager: 'Per Berg',
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    title: 'QA Lead',
    jobRole: 'QA Engineer',
    employment: 'Full-time',
    active: false,
  },
  {
    id: '4',
    countryCode: '+45',
    mobileNumber: '20456789',
    firstName: 'Anna',
    lastName: 'Jensen',
    externalCompany: true,
    companyName: 'Nordic Solutions',
    externalEmail: 'anna.jensen@nordicsolutions.dk',
    internalManager: 'Per Berg',
    startDate: '2025-01-10',
    endDate: '2025-12-31',
    title: 'Business Analyst',
    jobRole: 'Business Analyst',
    employment: 'Part-time',
    active: true,
  },
];

let nextId = 5;

// --- Service functions (replace with API calls later) ---

export function getUsers(): User[] {
  return [...users];
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(payload: CreateUserPayload): User {
  const newUser: User = {
    ...payload,
    id: String(nextId++),
    active: true,
  };
  users = [...users, newUser];
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updates };
  users = [...users];
  return users[index];
}
