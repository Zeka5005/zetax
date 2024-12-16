import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('signin')}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-colors
            ${activeTab === 'signin'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-colors
            ${activeTab === 'signup'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Sign Up
        </button>
      </div>

      {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};