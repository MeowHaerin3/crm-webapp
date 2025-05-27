import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { IoIosMoon } from "react-icons/io";
import { BsSun } from "react-icons/bs";

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
          <span className="text-2xl font-bold text-primary tracking-tight flex-shrink-0">CRM-app</span>
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
              {theme === 'dark' ? (
                <IoIosMoon className="w-6 h-6 transition-all duration-300" />
              ) : (
                <BsSun className="w-6 h-6 transition-all duration-300" />
              )}
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
