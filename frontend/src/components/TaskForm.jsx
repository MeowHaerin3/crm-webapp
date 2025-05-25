import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignee: initialData?.assignee || '',
    client: initialData?.client || '',
    user: initialData?.user || '', // user ID
    customer: initialData?.customer || '', // customer ID
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || '',
    tags: initialData?.tags || [],
    status: initialData?.status || 'pending',
  });
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch users and customers for select fields
    axios.get('http://localhost:8000/api/users/').then(res => setUsers(res.data));
    axios.get('http://localhost:8000/api/customers/').then(res => setCustomers(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-base-100 rounded-xl shadow-md">
      {/* Title, Status, Priority */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/2">
          <label className="label font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Task title (search or create)"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/4">
          <label className="label font-medium">Status</label>
          <select
            name="status"
            className="select select-bordered w-full"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="w-full md:w-1/4">
          <label className="label font-medium">Priority</label>
          <select
            name="priority"
            className="select select-bordered w-full"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      {/* Description */}
      <div>
        <label className="label font-medium">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full min-h-[80px]"
          placeholder="Describe the task..."
          value={form.description}
          onChange={handleChange}
        />
      </div>
      {/* User, Customer, Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label font-medium">Assignee (User)</label>
          <div className="relative group">
            <select name="user" className="select select-bordered w-full pr-10 focus:ring-2 focus:ring-primary transition-all" value={form.user} onChange={handleChange} required>
              <option value="">Select user</option>
              {users.length > 0 && users.map(u => (
                <option key={u.id} value={u.id}>{u.username}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-primary">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
            </span>
          </div>
        </div>
        <div>
          <label className="label font-medium">Client (Customer)</label>
          <div className="relative group">
            <select name="customer" className="select select-bordered w-full pr-10 focus:ring-2 focus:ring-primary transition-all" value={form.customer} onChange={handleChange} required>
              <option value="">Select customer</option>
              {customers.length > 0 && customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-primary">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
            </span>
          </div>
        </div>
        <div>
          <label className="label font-medium">Due Date</label>
          <input
            name="dueDate"
            type="date"
            className="input input-bordered w-full"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-2 justify-end mt-8">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Saving...' : 'Save Task'}</button>
      </div>
    </form>
  );
};

export default TaskForm;