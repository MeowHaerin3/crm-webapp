import { useEffect, useState } from 'react';
import axios from 'axios';
import AddContactForm from '../components/ContactForm';
import { MdAdd, MdPeople, MdEmail, MdPhone, MdBusinessCenter, MdClose } from 'react-icons/md';

const Contacts = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Stats calculations
  const totalContacts = customers.length;
  const activeContacts = customers.filter(customer => customer.status === 'active').length;
  const newContactsThisMonth = customers.filter(customer => {
    const createdDate = new Date(customer.createdAt);
    const now = new Date();
    return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
  }).length;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:8000/api/customers/')
      .then(res => setCustomers(res.data))
      .catch(() => setError('Failed to load contacts'))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/customers/${editingId}/`, formData);
      } else {
        await axios.post('http://localhost:8000/api/customers/', formData);
      }
      fetchCustomers();
      setShowAddForm(false);
      setEditingId(null);
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Contacts</h1>
          <p className="text-base-content/70 text-base">Manage your business relationships effectively.</p>
        </div>
        <button 
          className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform min-w-[140px] text-lg"
          onClick={() => {
            setEditingId(null);
            setShowAddForm(true);
          }}
        >
          <MdAdd className="w-6 h-6" />
          New Contact
        </button>
      </div>

      {error && <div className="text-error text-base font-medium mb-2">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-40 text-base-content/60 text-lg">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Contacts Card */}
            <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdPeople className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{totalContacts}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Total Contacts</div>
                </div>
              </div>
            </div>

            {/* Active Contacts Card */}
            <div className="card bg-gradient-to-br from-info/5 to-info/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-info/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdBusinessCenter className="w-7 h-7 text-info" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{activeContacts}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Active Contacts</div>
                </div>
              </div>
            </div>

            {/* New Contacts Card */}
            <div className="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-success/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdPhone className="w-7 h-7 text-success" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{newContactsThisMonth}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">New This Month</div>
                </div>
              </div>
            </div>
          </div>          {/* Contacts Table */}
          <div className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-base-content">Contact List</h3>
                  <p className="text-base-content/60 text-sm mt-1">Manage and track your business contacts</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="Search contacts..." className="input input-bordered w-72" />
                      <button className="btn btn-square btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-hover">
                  <thead className="bg-base-200/50 text-base-content/70">
                    <tr>
                      <th>Contact Details</th>
                      <th>Company</th>
                      <th>Contact Info</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(customer => (
                      <tr key={customer.id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                              {customer.name ? customer.name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                              <div className="font-semibold text-base-content">{customer.name || 'Unnamed Contact'}</div>
                              <div className="text-sm text-base-content/70">ID: #{customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <span className="font-medium">{customer.company || 'No Company'}</span>
                            <span className="text-sm text-base-content/70">Client</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-base-content/70">
                              <MdEmail className="w-4 h-4" />
                              <span>{customer.email || 'No email'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-base-content/70">
                              <MdPhone className="w-4 h-4" />
                              <span>{customer.phone || 'No phone'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold capitalize
                            ${customer.status === 'active' ? 'bg-success/10 text-success' : ''}
                            ${customer.status === 'inactive' ? 'bg-error/10 text-error' : ''}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full
                              ${customer.status === 'active' ? 'bg-success' : ''}
                              ${customer.status === 'inactive' ? 'bg-error' : ''}`}
                            ></span>
                            {customer.status || 'active'}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              className="btn btn-sm btn-ghost btn-square"
                              onClick={() => {
                                setEditingId(customer.id);
                                setShowAddForm(true);
                              }}
                              title="Edit Contact"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="btn btn-sm btn-ghost btn-square" title="Delete Contact">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Contact Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-base-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-base-content">
                {editingId ? 'Edit Contact' : 'New Contact'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                className="btn btn-ghost btn-sm"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <AddContactForm
              onSubmit={handleSubmit}
              initialData={editingId ? customers.find(c => c.id === editingId) : null}
              onCancel={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;