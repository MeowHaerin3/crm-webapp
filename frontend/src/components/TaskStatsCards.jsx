import { MdRadioButtonUnchecked, MdAccessTime, MdCheckCircle, MdError, MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const TaskStatsCards = ({ total, inProgress, completed, overdue }) => (
  <>
    <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform">
            <MdRadioButtonUnchecked className="w-7 h-7 text-primary" />
          </div>
          <MdTrendingUp className="w-6 h-6 text-primary/60" />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-base-content">{total}</div>
          <div className="text-sm font-medium text-base-content/70 mt-1">Total Tasks</div>
        </div>
      </div>
    </div>

    <div className="card bg-gradient-to-br from-warning/5 to-warning/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-warning/20 rounded-2xl group-hover:scale-110 transition-transform">
            <MdAccessTime className="w-7 h-7 text-warning" />
          </div>
          <MdTrendingUp className="w-6 h-6 text-warning/60" />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-base-content">{inProgress}</div>
          <div className="text-sm font-medium text-base-content/70 mt-1">In Progress</div>
        </div>
      </div>
    </div>

    <div className="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-success/20 rounded-2xl group-hover:scale-110 transition-transform">
            <MdCheckCircle className="w-7 h-7 text-success" />
          </div>
          <MdTrendingUp className="w-6 h-6 text-success/60" />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-base-content">{completed}</div>
          <div className="text-sm font-medium text-base-content/70 mt-1">Completed</div>
        </div>
      </div>
    </div>

    <div className="card bg-gradient-to-br from-error/5 to-error/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-error/20 rounded-2xl group-hover:scale-110 transition-transform">
            <MdError className="w-7 h-7 text-error" />
          </div>
          <MdTrendingDown className="w-6 h-6 text-error/60" />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-base-content">{overdue}</div>
          <div className="text-sm font-medium text-base-content/70 mt-1">Overdue</div>
        </div>
      </div>
    </div>
  </>
);

export default TaskStatsCards;
