import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdTrendingUp, MdPerson, MdAttachMoney, MdShowChart, MdBarChart, MdPieChart, MdTaskAlt, MdAssignment, MdError, MdCheckCircle, MdAccessTime } from 'react-icons/md';

function Dashboard() {
  const [stats, setStats] = useState({ customers: 0, products: 0, orders: 0, tasks: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([
      axios.get('http://localhost:8000/api/customers/'),
      axios.get('http://localhost:8000/api/products/'),
      axios.get('http://localhost:8000/api/orders/'),
      axios.get('http://localhost:8000/api/tasks/?ordering=-id&limit=5'),
    ])
      .then(([customersRes, productsRes, ordersRes, tasksRes]) => {
        setStats({
          customers: customersRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          tasks: tasksRes.data.length,
        });
        setRecentTasks(tasksRes.data.slice(0, 5));
      })
      .catch(() => setError('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">

      {error && <div className="text-error text-base font-medium mb-2">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-40 text-base-content/60 text-lg">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Customers Card */}
            <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdPerson className="w-7 h-7 text-primary" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-primary/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{stats.customers}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Total Customers</div>
                </div>
              </div>
            </div>

            {/* Products Card */}
            <div className="card bg-gradient-to-br from-info/5 to-info/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-info/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdAssignment className="w-7 h-7 text-info" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-info/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{stats.products}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Total Products</div>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-success/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdAttachMoney className="w-7 h-7 text-success" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-success/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{stats.orders}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Total Orders</div>
                </div>
              </div>
            </div>

            {/* Tasks Card */}
            <div className="card bg-gradient-to-br from-warning/5 to-warning/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-warning/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdTaskAlt className="w-7 h-7 text-warning" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-warning/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{stats.tasks}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Active Tasks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders Trend */}
            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-base-content">Orders Trend</h3>
                  <MdBarChart className="text-xl text-base-content/60" />
                </div>
                <div className="h-48 flex items-end gap-2 px-2 bg-base-200/30 rounded-lg">
                  {[12, 18, 15, 22, 23].map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 group">
                      <div className="w-full max-w-[30px] rounded-t bg-primary/20 group-hover:bg-primary transition-colors duration-200" 
                           style={{ height: `${val * 4}px` }}></div>
                      <span className="text-xs text-base-content/60 mt-2">{['Jan','Feb','Mar','Apr','May'][idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Distribution */}
            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-base-content">Tasks by Status</h3>
                  <MdPieChart className="text-xl text-base-content/60" />
                </div>
                <div className="flex items-center justify-center gap-8">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full" 
                         style={{background: 'conic-gradient(#0ea5e9 0% 40%, #f59e0b 40% 70%, #10b981 70% 100%)'}}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100 rounded-full m-2">
                      <span className="font-bold text-base-content">{stats.tasks}</span>
                      <span className="text-xs text-base-content/70">Total</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#0ea5e9]"></span>
                      <span className="text-sm text-base-content/70">In Progress (40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                      <span className="text-sm text-base-content/70">Pending (30%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                      <span className="text-sm text-base-content/70">Completed (30%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <h3 className="text-lg font-bold text-base-content mb-6">Recent Tasks</h3>
              <div className="overflow-x-auto">
                <table className="table table-hover">
                  <thead className="bg-base-200/50 text-base-content/70">
                    <tr>
                      <th>Title</th>
                      <th>Assignee</th>
                      <th>Status</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr key={task.id} className="hover">
                        <td className="font-medium">{task.title}</td>
                        <td>{task.assignee}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold capitalize
                            ${task.status === 'completed' ? 'bg-success/10 text-success' : ''}
                            ${task.status === 'in-progress' ? 'bg-info/10 text-info' : ''}
                            ${task.status === 'pending' ? 'bg-warning/10 text-warning' : ''}
                            ${task.status === 'overdue' ? 'bg-error/10 text-error' : ''}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="text-base-content/70">{task.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
