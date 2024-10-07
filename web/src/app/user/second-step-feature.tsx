import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecondStepFeature: React.FC = () => {
  const [gdprChecked, setGdprChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [socialMediaChecked, setSocialMediaChecked] = useState(false);
  const navigate = useNavigate();

  const allChecked = gdprChecked && termsChecked && socialMediaChecked;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Almost There!</h1>
        <p className="text-center mb-4">
          Almost there... Please confirm your agreements to proceed.
        </p>

        <div className="mb-4">
          <label className="block">
            <input
              type="checkbox"
              checked={gdprChecked}
              onChange={() => setGdprChecked(!gdprChecked)}
            />
            {' '}
            I agree to the
            <a href="/gdpr" target="_blank" className="text-blue-500 underline"> GDPR Policy</a>
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
            />
            {' '}
            I agree to the
            <a href="/terms" target="_blank" className="text-blue-500 underline"> Terms of Conduct</a>
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            <input
              type="checkbox"
              checked={socialMediaChecked}
              onChange={() => setSocialMediaChecked(!socialMediaChecked)}
            />
            {' '}
            I have followed Gigawrap / Megaoklejanie on Social Media.
          </label>
        </div>

        <button
          onClick={() => navigate('/user/third-step')}
          disabled={!allChecked}
          className={`bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600 w-full ${!allChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecondStepFeature;
