import React from 'react';

interface AccessDeniedPageProps {
  title?: string;
  message?: string;
  showLoginButton?: boolean;
  showHomeButton?: boolean;
  onLoginClick?: () => void;
  onHomeClick?: () => void;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({
  title = "Access Denied",
  message = "You don't have permission to access this page. Please log in to continue.",
  showLoginButton = true,
  showHomeButton = true,
  onLoginClick,
  onHomeClick
}) => {
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      // Default behavior - redirect to login page
      window.location.href = '/login';
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      // Default behavior - redirect to home page
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icon Section */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed">
            {message}
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Need help?</strong> Contact your administrator or try logging in with proper credentials.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showLoginButton && (
              <button
                onClick={handleLoginClick}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            )}
            
            {showHomeButton && (
              <button
                onClick={handleHomeClick}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </button>
            )}
          </div>

          {/* Back Link */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Error Code: 403 - Forbidden Access
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 border border-red-100 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border border-red-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-red-100 rounded-full opacity-25"></div>
        <div className="absolute bottom-40 right-32 w-8 h-8 bg-red-50 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;