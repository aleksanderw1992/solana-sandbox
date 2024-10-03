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
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Second Step: Confirm</h1>

        <div className="mb-4">
          <label className="block">
            <input
              type="checkbox"
              checked={gdprChecked}
              onChange={() => setGdprChecked(!gdprChecked)}
            />
            {' '}
            I agree to the
            <a href="/gdpr" target="_blank" className="text-blue-500 underline">GDPR Policy</a>
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
            <a href="/terms" target="_blank" className="text-blue-500 underline">Terms of Conduct</a>
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
          className={`${
            allChecked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          } text-white p-2 mt-4 rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecondStepFeature;
