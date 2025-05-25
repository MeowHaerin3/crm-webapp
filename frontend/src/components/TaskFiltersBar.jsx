import { MdSearch, MdFilterList } from 'react-icons/md';

const TaskFiltersBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, selectedTasks, children }) => (
  <div className="card bg-base-100 shadow-md mb-6">
    <div className="card-body p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="form-control flex-1 min-w-[220px]">
          <div className="input-group w-full">
            
            <input
              type="text"
              placeholder="Search tasks, clients, or assignees..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Status Filter */}
        <div className="form-control min-w-[180px]">
          <select 
            className="select select-bordered"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        {/* Filter Button */}
        <button className="btn btn-outline gap-2 min-w-[150px]">
          <MdFilterList className="w-5 h-5" />
          More Filters
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default TaskFiltersBar;
