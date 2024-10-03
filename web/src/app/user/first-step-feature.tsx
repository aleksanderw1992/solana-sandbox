import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsletterForm } from '../newsletter/newsletter-ui';
import toast, { Toaster } from 'react-hot-toast';

import API_URL from '../config/apiConfig';

const API_ENDPOINT = `${API_URL}/newsletter`;

const FirstStepFeature: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nextStepEnabled, setNextStepEnabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Successfully signed up!');
        setNextStepEnabled(true);
      } else {
        toast.error('Error signing up.');
      }
    } catch {
      toast.error('An error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">First Step: Newsletter Signup</h1>
        <NewsletterForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        {nextStepEnabled && (
          <button
            onClick={() => navigate('/user/second-step')}
            className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
          >
            Next
          </button>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default FirstStepFeature;
