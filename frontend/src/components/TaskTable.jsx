import { MdPerson, MdCalendarToday, MdMoreVert, MdEdit, MdDelete, MdRemoveRedEye, MdCheckCircle, MdAccessTime, MdError, MdRadioButtonUnchecked } from 'react-icons/md';

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return <MdCheckCircle className="w-4 h-4" />;
    case 'in-progress': return <MdAccessTime className="w-4 h-4" />;
    case 'pending': return <MdRadioButtonUnchecked className="w-4 h-4" />;
    case 'overdue': return <MdError className="w-4 h-4" />;
    default: return <MdRadioButtonUnchecked className="w-4 h-4" />;
  }
};

const TaskTable = ({ tasks, selectedTasks, onTaskSelect, onEditTask, onMarkComplete, onDeleteTask }) => (
  <div className="card bg-base-100 shadow-md">
    <div className="card-body p-0">
      <div className="overflow-x-auto">
        <table className="table table-hover min-w-[900px]">
          <thead className="bg-base-200 text-base-content/80 text-sm">
            <tr>
              <th className="w-10"></th>
              <th className="min-w-[220px]">Task</th>
              <th className="min-w-[180px]">Assignee</th>
              <th className="min-w-[160px]">Client</th>
              <th className="min-w-[110px]">Priority</th>
              <th className="min-w-[130px]">Status</th>
              <th className="min-w-[130px]">Due Date</th>
              <th className="w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover">
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => onTaskSelect(task.id)}
                  />
                </td>
                <td>
                  <div className="space-y-2">
                    <div className="font-semibold text-base-content">{task.title}</div>
                    <div className="text-sm text-base-content/70">{task.description}</div>
                    <div className="flex gap-2">
                      {(task.tags || []).map((tag, index) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        {task.avatar ? (
                          <img src={task.avatar} alt={task.assignee} />
                        ) : (
                          <div className="bg-base-200 w-full h-full flex items-center justify-center text-base-content/60">
                            <MdPerson className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-base-content">{task.assignee}</div>
                      <div className="text-sm text-base-content/70">Assignee</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <MdPerson className="w-4 h-4 text-base-content/60" />
                    <span className="font-medium">{task.client}</span>
                  </div>
                </td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold capitalize
                    ${task.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                    ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${task.priority === 'low' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {task.priority === 'high' && <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>}
                    {task.priority === 'medium' && <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>}
                    {task.priority === 'low' && <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>}
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold capitalize
                    ${task.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                    ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                    ${task.status === 'pending' ? 'bg-gray-100 text-gray-700' : ''}
                    ${task.status === 'overdue' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {getStatusIcon(task.status)}
                    {task.status?.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="w-4 h-4 text-base-content/60" />
                    <span className={task.status === 'overdue' ? 'text-error font-medium' : ''}>
                      {task.dueDate}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      className="btn btn-xs btn-warning w-full flex gap-1 items-center"
                      title="Edit Task"
                      onClick={() => onEditTask(task)}
                    >
                      <MdEdit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      className="btn btn-xs btn-success w-full flex gap-1 items-center"
                      title="Mark Complete"
                      onClick={() => onMarkComplete && onMarkComplete(task)}
                      disabled={task.status === 'completed'}
                    >
                      <MdCheckCircle className="w-4 h-4" /> Complete
                    </button>
                    <button
                      className="btn btn-xs btn-error w-full flex gap-1 items-center"
                      title="Delete Task"
                      onClick={() => onDeleteTask && onDeleteTask(task)}
                    >
                      <MdDelete className="w-4 h-4" /> Delete
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
);

export default TaskTable;
