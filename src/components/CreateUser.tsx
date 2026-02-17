import { useState, type FormEvent } from 'react';
import { COUNTRY_CODES, JOB_ROLES, CreateUserPayload, EMPLOYMENT_TYPES } from '../types';
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
  employment: 'Full-time',
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

  function update<K extends keyof CreateUserPayload>(key: K, value: CreateUserPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
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

        <div className="form-group">
          <label>External Company</label>
          <div className="toggle-row">
            <button
              type="button"
              className={`toggle-btn ${!form.externalCompany ? 'active' : ''}`}
              onClick={() => {
                update('externalCompany', false);
                update('companyName', '');
              }}
            >
              No
            </button>
            <button
              type="button"
              className={`toggle-btn ${form.externalCompany ? 'active' : ''}`}
              onClick={() => update('externalCompany', true)}
            >
              Yes
            </button>
          </div>
        </div>

        {form.externalCompany && (
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              placeholder="Search or enter company name..."
              required
            />
          </div>
        )}

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

        <div className="form-group">
          <label htmlFor="internalManager">Internal Manager</label>
          <input
            id="internalManager"
            type="text"
            value={form.internalManager}
            onChange={(e) => update('internalManager', e.target.value)}
            required
          />
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

        <div className="form-group">
          <label htmlFor="employment">Employment</label>
          <select
            id="employment"
            value={form.employment}
            onChange={(e) => update('employment', e.target.value)}
            required
          >
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
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
