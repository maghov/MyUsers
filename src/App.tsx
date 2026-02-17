import { useState } from 'react';
import CreateUser from './components/CreateUser';
import ManageUser from './components/ManageUser';

type Tab = 'create' | 'manage';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('create');

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyUsers</h1>
        <p>User Management</p>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create User
        </button>
        <button
          className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage User
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'create' && <CreateUser />}
        {activeTab === 'manage' && <ManageUser />}
      </main>
    </div>
  );
}

export default App;
