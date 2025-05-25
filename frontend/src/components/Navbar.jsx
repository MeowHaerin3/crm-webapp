import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav className="bg-base-100 border-b border-base-200 sticky top-0 z-40 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <span className="text-2xl font-bold text-primary tracking-tight flex-shrink-0">CRM</span>
          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdSearch className="h-5 w-5 text-base-content/50" />
                </span>
                <input
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 rounded-lg border border-base-200 bg-base-200 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          {/* Right: Theme toggle & Profile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-base-content hover:bg-base-200 transition-colors"
              aria-label="Toggle theme"
            >
              {/* Sun icon */}
              <svg
                className={`w-6 h-6 transition-all ${theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* Moon icon */}
              <svg
                className={`absolute w-6 h-6 transition-all ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </button>
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 cursor-pointer">
                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-base font-semibold text-primary">JD</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-base-content">John Doe</p>
                  <p className="text-xs text-base-content/60">john.doe@email.com</p>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 w-52 rounded-lg shadow-lg mt-2 border border-base-200">
                <li><Link to="/profile" className="text-base-content">Profile</Link></li>
                <li><Link to="/settings" className="text-base-content">Settings</Link></li>
                <li className="border-t border-base-200">
                  <Link to="/logout" className="text-red-600">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
