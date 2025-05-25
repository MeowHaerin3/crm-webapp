import { useState } from 'react';
import { 
  MdTrendingUp, MdPerson, MdAttachMoney, MdShowChart, MdBarChart, MdPieChart, MdDownload, 
  MdGroup, MdCall, MdMailOutline, MdArrowUpward 
} from 'react-icons/md';

// Mock data for reports
const mockReportsData = {
  overview: {
    totalContacts: 1247,
    newContactsThisMonth: 89,
    totalRevenue: 125420,
    activeDeals: 23
  },
  chartData: [
    { month: 'Jan', contacts: 65, deals: 12, revenue: 8500 },
    { month: 'Feb', contacts: 78, deals: 18, revenue: 12300 },
    { month: 'Mar', contacts: 92, deals: 15, revenue: 9800 },
    { month: 'Apr', contacts: 85, deals: 22, revenue: 15600 },
    { month: 'May', contacts: 89, deals: 23, revenue: 18700 }
  ]
};

// Reports Page Component
function ReportsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('contacts');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Reports & Analytics</h1>
          <p className="text-base-content/70 text-base">Track your CRM performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="select select-bordered bg-base-100 border-base-200 text-base-content"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform">
            <MdDownload className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Contacts Card */}
        <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform">
                <MdGroup className="w-7 h-7 text-primary" />
              </div>
              <MdTrendingUp className="w-6 h-6 text-primary/60" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-base-content">{mockReportsData.overview.totalContacts.toLocaleString()}</div>
              <div className="text-sm font-medium text-base-content/70 mt-1">Total Contacts</div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <MdArrowUpward className="text-success" />
              <span className="text-success text-sm">+12%</span>
              <span className="text-base-content/60 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        {/* New Contacts Card */}
        <div className="card bg-gradient-to-br from-info/5 to-info/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-info/20 rounded-2xl group-hover:scale-110 transition-transform">
                <MdPerson className="w-7 h-7 text-info" />
              </div>
              <MdTrendingUp className="w-6 h-6 text-info/60" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-base-content">{mockReportsData.overview.newContactsThisMonth}</div>
              <div className="text-sm font-medium text-base-content/70 mt-1">New This Month</div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <MdArrowUpward className="text-success" />
              <span className="text-success text-sm">+8%</span>
              <span className="text-base-content/60 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-success/20 rounded-2xl group-hover:scale-110 transition-transform">
                <MdAttachMoney className="w-7 h-7 text-success" />
              </div>
              <MdTrendingUp className="w-6 h-6 text-success/60" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-base-content">
                ${mockReportsData.overview.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-base-content/70 mt-1">Total Revenue</div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <MdArrowUpward className="text-success" />
              <span className="text-success text-sm">+24%</span>
              <span className="text-base-content/60 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        {/* Active Deals Card */}
        <div className="card bg-gradient-to-br from-warning/5 to-warning/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-warning/20 rounded-2xl group-hover:scale-110 transition-transform">
                <MdShowChart className="w-7 h-7 text-warning" />
              </div>
              <MdTrendingUp className="w-6 h-6 text-warning/60" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-base-content">{mockReportsData.overview.activeDeals}</div>
              <div className="text-sm font-medium text-base-content/70 mt-1">Active Deals</div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <MdArrowUpward className="text-success" />
              <span className="text-success text-sm">+3</span>
              <span className="text-base-content/60 text-sm">this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Growth Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-base-content">Contact Growth</h3>
              <MdBarChart className="text-xl text-base-content/60" />
            </div>
            <div className="h-64 flex items-end gap-2 px-2">
              {mockReportsData.chartData.map((data, idx) => (
                <div key={data.month} className="flex flex-col items-center flex-1 group">
                  <div
                    className="w-full max-w-[30px] rounded-t bg-primary/20 group-hover:bg-primary transition-colors duration-200"
                    style={{ height: `${data.contacts * 2}px` }}
                    title={`Contacts: ${data.contacts}`}
                  ></div>
                  <span className="text-xs text-base-content/60 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-base-content">Revenue Breakdown</h3>
              <MdPieChart className="text-xl text-base-content/60" />
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-40 h-40">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #0ea5e9 0% 30%,
                      #10b981 30% 55%,
                      #f59e0b 55% 75%,
                      #ef4444 75% 90%,
                      #8b5cf6 90% 100%
                    )`
                  }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100 rounded-full m-2">
                  <span className="font-bold text-base-content">Revenue</span>
                  <span className="text-xs text-base-content/70">by Month</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0ea5e9]"></span>
                  <span className="text-sm text-base-content/70">Jan (30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                  <span className="text-sm text-base-content/70">Feb (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                  <span className="text-sm text-base-content/70">Mar (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                  <span className="text-sm text-base-content/70">Apr (15%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                  <span className="text-sm text-base-content/70">May (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body">
          <h3 className="text-lg font-bold text-base-content mb-6">Monthly Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="table table-hover">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th>Month</th>
                  <th>Contacts</th>
                  <th>Deals</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {mockReportsData.chartData.map((data) => (
                  <tr key={data.month} className="hover">
                    <td className="font-medium">{data.month}</td>
                    <td>{data.contacts}</td>
                    <td>{data.deals}</td>
                    <td>${data.revenue.toLocaleString()}</td>
                    <td>
                      <span className="inline-flex items-center gap-1 text-success">
                        <MdArrowUpward />
                        {((data.revenue / mockReportsData.chartData[0].revenue - 1) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;