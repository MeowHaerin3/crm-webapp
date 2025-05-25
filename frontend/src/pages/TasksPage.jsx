import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd, MdEdit, MdDelete, MdCheckCircle } from 'react-icons/md';
import TaskForm from '../components/TaskForm';
import TaskStatsCards from '../components/TaskStatsCards';
import TaskFiltersBar from '../components/TaskFiltersBar';
import TaskTable from '../components/TaskTable';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper: Convert backend task to frontend task (adds status field)
  const mapBackendTask = (task) => {
    // Status logic: completed, overdue, in-progress, pending
    let status = 'pending';
    if (task.completed) {
      status = 'completed';
    } else {
      const due = new Date(task.due_date);
      const now = new Date();
      if (due < now) {
        status = 'overdue';
      } else {
        status = 'in-progress';
      }
    }
    return {
      ...task,
      status,
      priority: (task.priority || '').toLowerCase(),
      dueDate: task.due_date,
      assignee: task.user, // You may want to resolve username
      client: task.customer, // You may want to resolve customer name
    };
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:8000/api/tasks/?ordering=-id')
      .then(res => {
        setTasks(res.data.map(mapBackendTask));
      })
      .catch(() => setError('Failed to load tasks'))
      .finally(() => setLoading(false));
  }, []);

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length ? [] : tasks.map(task => task.id)
    );
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = (task.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (task.client?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (task.assignee?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;

  // Bulk: Mark selected tasks as complete
  const handleBulkMarkComplete = async () => {
    if (!selectedTasks.length) return;
    setLoading(true);
    setError('');
    try {
      const updatedTasks = await Promise.all(selectedTasks.map(async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task || task.completed) return null;
        const payload = { ...task, completed: true };
        const res = await axios.put(`http://localhost:8000/api/tasks/${id}/`, payload);
        return mapBackendTask(res.data);
      }));
      setTasks(prev => prev.map(t => {
        const updated = updatedTasks.find(u => u && u.id === t.id);
        return updated ? updated : t;
      }));
      setSelectedTasks([]);
    } catch {
      setError('Failed to mark tasks complete');
    } finally {
      setLoading(false);
    }
  };

  // Bulk: Delete selected tasks
  const handleBulkDelete = async () => {
    if (!selectedTasks.length) return;
    setLoading(true);
    setError('');
    try {
      await Promise.all(selectedTasks.map(id => axios.delete(`http://localhost:8000/api/tasks/${id}/`)));
      setTasks(prev => prev.filter(t => !selectedTasks.includes(t.id)));
      setSelectedTasks([]);
    } catch {
      setError('Failed to delete tasks');
    } finally {
      setLoading(false);
    }
  };

  // Bulk: Edit (open form for first selected task)
  const handleBulkEdit = () => {
    if (!selectedTasks.length) return;
    const task = tasks.find(t => t.id === selectedTasks[0]);
    if (task) {
      setEditingTask(task);
      setShowTaskForm(true);
    }
  };

  // Edit single task (from table, if needed)
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Update Task (PUT)
  const handleTaskFormSubmit = async (form) => {
    try {
      setLoading(true);
      setError('');
      const payload = {
        title: form.title,
        description: form.description,
        priority: form.priority.charAt(0).toUpperCase() + form.priority.slice(1),
        due_date: form.dueDate,
        user: form.user,
        customer: form.customer,
        completed: form.status === 'completed',
      };
      let res;
      if (editingTask) {
        res = await axios.put(`http://localhost:8000/api/tasks/${editingTask.id}/`, payload);
        setTasks(prev => prev.map(t => t.id === editingTask.id ? mapBackendTask(res.data) : t));
      } else {
        res = await axios.post('http://localhost:8000/api/tasks/', payload);
        setTasks(prev => [mapBackendTask(res.data), ...prev]);
      }
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(editingTask ? 'Failed to update task' : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Tasks</h1>
          <p className="text-base-content/70 text-base">Manage, track, and complete your CRM tasks efficiently.</p>
        </div>
        <button className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform min-w-[140px] text-lg" onClick={() => setShowTaskForm(true)}>
          <MdAdd className="w-6 h-6" />
          New Task
        </button>
      </div>
      {error && <div className="text-error text-base font-medium mb-2">{error}</div>}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-base-content/60 text-lg">Loading...</div>
      ) : (
        <>
          {/* Stats Cards - bento style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <TaskStatsCards total={totalTasks} inProgress={inProgress} completed={completed} overdue={overdue} />
          </div>

          {/* Filters/Search */}
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body p-4">
              <TaskFiltersBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                selectedTasks={selectedTasks}
              >
                {/* Bulk Actions */}
                {selectedTasks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4 mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
                    <span className="text-base font-semibold">
                      {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <button className="btn btn-sm btn-success gap-1 shadow" onClick={handleBulkMarkComplete} disabled={loading || selectedTasks.length === 0}>
                        <MdCheckCircle className="w-4 h-4" />
                        Mark Complete
                      </button>
                      <button className="btn btn-sm btn-warning gap-1 shadow" onClick={handleBulkEdit} disabled={loading || selectedTasks.length === 0}>
                        <MdEdit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="btn btn-sm btn-error gap-1 shadow" onClick={handleBulkDelete} disabled={loading || selectedTasks.length === 0}>
                        <MdDelete className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </TaskFiltersBar>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="card bg-base-100 shadow-lg border border-base-200 overflow-x-auto">
            <div className="card-body p-0">
              <TaskTable
                tasks={filteredTasks}
                selectedTasks={selectedTasks}
                onTaskSelect={handleTaskSelect}
                onEditTask={handleEditTask}
                onMarkComplete={handleBulkMarkComplete}
                onDeleteTask={handleBulkDelete}
              />
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <div className="join shadow-md rounded-lg overflow-hidden">
              <button className="join-item btn btn-ghost">«</button>
              <button className="join-item btn btn-active">1</button>
              <button className="join-item btn btn-ghost">2</button>
              <button className="join-item btn btn-ghost">3</button>
              <button className="join-item btn btn-ghost">»</button>
            </div>
          </div>
        </>
      )}
      {/* Modal for TaskForm */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-base-200">
            <TaskForm
              onSubmit={handleTaskFormSubmit}
              onCancel={() => { setShowTaskForm(false); setEditingTask(null); }}
              initialData={editingTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;