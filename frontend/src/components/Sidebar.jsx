import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard, MdContacts, MdAssignment, MdTask, MdBarChart, MdSettings } from 'react-icons/md'

const navItems = [
  { to: '/', label: 'Dashboard', icon: <MdDashboard className="text-xl" /> },
  { to: '/contacts', label: 'Contacts', icon: <MdContacts className="text-xl" /> },
  { to: '/deals', label: 'Deals', icon: <MdAssignment className="text-xl" /> },
  { to: '/tasks', label: 'Tasks', icon: <MdTask className="text-xl" /> },
  { to: '/reports', label: 'Reports', icon: <MdBarChart className="text-xl" /> },
  
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-base-100 border-r border-base-200">
      <nav className="flex flex-col h-full py-6">
        <div className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
              (item.to !== '/' && location.pathname.startsWith(item.to));
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-base-content hover:bg-base-200'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto px-3">
          <div className="p-4 rounded-lg bg-base-200">
            <p className="text-sm font-medium text-base-content">Need Help?</p>
            <p className="text-xs text-base-content/60 mt-1">Check our documentation</p>
            <button className="mt-3 text-xs font-medium text-primary hover:text-primary-focus">
              View Documentation
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar