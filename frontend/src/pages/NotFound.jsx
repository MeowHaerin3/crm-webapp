import React from 'react'
import { Link } from 'react-router-dom';
import { MdHome, MdArrowBack, MdSupport } from 'react-icons/md';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-2xl">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[180px] font-extrabold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-base-content mb-2">Page Not Found</h1>
              <p className="text-lg text-base-content/70">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-base-200/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-base-content mb-4">You might want to:</h2>
          <ul className="space-y-2 text-base-content/70">
            <li>• Check the URL for typos</li>
            <li>• Make sure you have the right permissions</li>
            <li>• Return to the previous page</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="btn btn-primary gap-2 min-w-[200px]"
          >
            <MdHome className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline gap-2 min-w-[200px]"
          >
            <MdArrowBack className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Support Link */}
        <div className="mt-8">
          <Link 
            to="/support" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors"
          >
            <MdSupport className="w-5 h-5" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;