import { useState, useRef, type FormEvent } from 'react';
import { COUNTRY_CODES, JOB_ROLES, COMPANIES, MANAGERS, CreateUserPayload } from '../types';
import { createUser } from '../data/dummyData';

const initialForm: CreateUserPayload = {
  countryCode: '+47',
  mobileNumber: '',
  firstName: '',
  lastName: '',
  externalCompany: false,
  companyName: '',
  externalEmail: '',
  internalManager: '',
  startDate: '',
  endDate: '',
  title: '',
  jobRole: '',
};

function getMaxEndDate(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

function CreateUser() {
  const [form, setForm] = useState<CreateUserPayload>({ ...initialForm });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Reference field state
  const [companySearch, setCompanySearch] = useState('');
  const [companyOpen, setCompanyOpen] = useState(false);
  const [managerSearch, setManagerSearch] = useState('');
  const [managerOpen, setManagerOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof CreateUserPayload>(key: K, value: CreateUserPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Company reference field
  const filteredCompanies = COMPANIES.filter((c) =>
    c.toLowerCase().includes(companySearch.toLowerCase())
  );

  function selectCompany(name: string) {
    update('externalCompany', true);
    update('companyName', name);
    setCompanySearch(name);
    setCompanyOpen(false);
  }

  function clearCompany() {
    update('externalCompany', false);
    update('companyName', '');
    setCompanySearch('');
  }

  // Manager reference field
  const filteredManagers = MANAGERS.filter((m) =>
    m.toLowerCase().includes(managerSearch.toLowerCase())
  );

  function selectManager(name: string) {
    update('internalManager', name);
    setManagerSearch(name);
    setManagerOpen(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (form.endDate) {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      if (new Date(form.endDate) > maxDate) {
        setError('End date cannot be more than 1 year in the future.');
        return;
      }
    }

    createUser(form);
    setSubmitted(true);
    setForm({ ...initialForm });
    setCompanySearch('');
    setManagerSearch('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="form-container">
      <h2>Create User</h2>

      {submitted && <div className="success-msg">User created successfully!</div>}
      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group small">
            <label htmlFor="countryCode">Country Code</label>
            <select
              id="countryCode"
              value={form.countryCode}
              onChange={(e) => update('countryCode', e.target.value)}
            >
              {COUNTRY_CODES.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.code} ({cc.country})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="tel"
              value={form.mobileNumber}
              onChange={(e) => update('mobileNumber', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        {/* External Company — reference search field */}
        <div className="form-group ref-field" ref={companyRef}>
          <label htmlFor="companySearch">External Company</label>
          {form.companyName ? (
            <div className="ref-selected">
              <span>{form.companyName}</span>
              <button type="button" className="ref-clear" onClick={clearCompany}>
                Clear
              </button>
            </div>
          ) : (
            <>
              <input
                id="companySearch"
                type="text"
                value={companySearch}
                onChange={(e) => {
                  setCompanySearch(e.target.value);
                  setCompanyOpen(true);
                }}
                onFocus={() => setCompanyOpen(true)}
                onBlur={() => setTimeout(() => setCompanyOpen(false), 150)}
                placeholder="Search company..."
                autoComplete="off"
              />
              {companyOpen && companySearch && (
                <ul className="ref-dropdown">
                  {filteredCompanies.map((c) => (
                    <li key={c}>
                      <button type="button" onMouseDown={() => selectCompany(c)}>
                        {c}
                      </button>
                    </li>
                  ))}
                  {filteredCompanies.length === 0 && (
                    <li className="ref-no-match">No match found</li>
                  )}
                </ul>
              )}
            </>
          )}
          <span className="field-hint">
            {form.companyName ? 'External company selected' : 'Leave empty if not external'}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="externalEmail">User's External Email</label>
          <input
            id="externalEmail"
            type="email"
            value={form.externalEmail}
            onChange={(e) => update('externalEmail', e.target.value)}
            required
          />
        </div>

        {/* Internal Manager — reference search field */}
        <div className="form-group ref-field" ref={managerRef}>
          <label htmlFor="managerSearch">Internal Manager</label>
          {form.internalManager ? (
            <div className="ref-selected">
              <span>{form.internalManager}</span>
              <button
                type="button"
                className="ref-clear"
                onClick={() => {
                  update('internalManager', '');
                  setManagerSearch('');
                }}
              >
                Clear
              </button>
            </div>
          ) : (
            <>
              <input
                id="managerSearch"
                type="text"
                value={managerSearch}
                onChange={(e) => {
                  setManagerSearch(e.target.value);
                  setManagerOpen(true);
                }}
                onFocus={() => setManagerOpen(true)}
                onBlur={() => setTimeout(() => setManagerOpen(false), 150)}
                placeholder="Search manager..."
                autoComplete="off"
                required
              />
              {managerOpen && managerSearch && (
                <ul className="ref-dropdown">
                  {filteredManagers.map((m) => (
                    <li key={m}>
                      <button type="button" onMouseDown={() => selectManager(m)}>
                        {m}
                      </button>
                    </li>
                  ))}
                  {filteredManagers.length === 0 && (
                    <li className="ref-no-match">No match found</li>
                  )}
                </ul>
              )}
            </>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={form.startDate}
              onChange={(e) => update('startDate', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              value={form.endDate}
              onChange={(e) => update('endDate', e.target.value)}
              max={getMaxEndDate()}
              required
            />
            <span className="field-hint">Max 1 year from today</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobRole">Job Role</label>
          <select
            id="jobRole"
            value={form.jobRole}
            onChange={(e) => update('jobRole', e.target.value)}
            required
          >
            <option value="">Select a role...</option>
            {JOB_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
