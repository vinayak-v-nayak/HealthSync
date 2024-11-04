// UIComponents.js
import React from 'react';

// Button Component
export const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
export const Input = ({ value, onChange, placeholder, className = '', ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

// Card Component
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardContent Component
export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`overflow-y-auto ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardFooter Component
export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-4 border-t pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
