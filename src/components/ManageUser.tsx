import { useState, useEffect } from 'react';
import { User, EMPLOYMENT_TYPES } from '../types';
import { getUsers, updateUser } from '../data/dummyData';

function ManageUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  function selectUser(id: string) {
    const user = users.find((u) => u.id === id);
    if (user) {
      setSelectedId(id);
      setEditForm({ ...user });
    }
  }

  function handleUpdate<K extends keyof User>(key: K, value: User[K]) {
    if (!editForm) return;
    setEditForm({ ...editForm, [key]: value });
  }

  function handleSave() {
    if (!editForm || !selectedId) return;
    updateUser(selectedId, editForm);
    setUsers(getUsers());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="form-container">
      <h2>Manage User</h2>

      <div className="form-group">
        <label htmlFor="userSearch">Search User by Name</label>
        <input
          id="userSearch"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a name to search..."
        />
      </div>

      {search && filteredUsers.length > 0 && !selectedId && (
        <ul className="user-list">
          {filteredUsers.map((u) => (
            <li key={u.id}>
              <button
                className="user-list-btn"
                onClick={() => selectUser(u.id)}
              >
                {u.firstName} {u.lastName}
                {!u.active && <span className="badge inactive">Inactive</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedId && filteredUsers.length > 0 && (
        <div className="user-select-bar">
          <span>
            Selected: <strong>{editForm?.firstName} {editForm?.lastName}</strong>
          </span>
          <button
            className="change-btn"
            onClick={() => {
              setSelectedId(null);
              setEditForm(null);
              setSearch('');
            }}
          >
            Change
          </button>
        </div>
      )}

      {editForm && (
        <>
          {saved && <div className="success-msg">User updated successfully!</div>}

          <div className="form-group">
            <label className="toggle-label">
              <span>Deactivate User</span>
              <input
                type="checkbox"
                checked={!editForm.active}
                onChange={(e) => handleUpdate('active', !e.target.checked)}
              />
              <span className="toggle-switch" />
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editFirstName">First Name</label>
              <input
                id="editFirstName"
                type="text"
                value={editForm.firstName}
                onChange={(e) => handleUpdate('firstName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="editLastName">Last Name</label>
              <input
                id="editLastName"
                type="text"
                value={editForm.lastName}
                onChange={(e) => handleUpdate('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="editMobile">Mobile</label>
            <input
              id="editMobile"
              type="text"
              value={`${editForm.countryCode} ${editForm.mobileNumber}`}
              readOnly
              className="readonly"
            />
          </div>

          <div className="form-group">
            <label htmlFor="editEmail">Email</label>
            <input
              id="editEmail"
              type="email"
              value={editForm.externalEmail}
              onChange={(e) => handleUpdate('externalEmail', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="editEmployment">Employment</label>
            <select
              id="editEmployment"
              value={editForm.employment}
              onChange={(e) => handleUpdate('employment', e.target.value)}
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="submit-btn" onClick={handleSave}>
            Save Changes
          </button>
        </>
      )}

      {search && filteredUsers.length === 0 && (
        <p className="no-results">No users found matching "{search}".</p>
      )}
    </div>
  );
}

export default ManageUser;
