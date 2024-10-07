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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage(null);
      } else {
        handleError();
      }
    } catch {
      handleError();
    }
  };

  const handleError = () => {
    setErrorMessage(
      `Dear user, unfortunately, we are in the process of improving our user experience and migrating to another server. To continue, please go to this page:
      https://solana-last-try-env.eba-pne33s9j.eu-north-1.elasticbeanstalk.com/newsletter
      (open this link in a new tab) and allow the security exception in your browser. Ensure you see the information in JSON format.`
    );
    toast.error('An error occurred.');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Newsletter</h1>
        <p className="text-center mb-4">
          Stay updated with the latest news and promotions. Subscribe to our newsletter and be the first to claim your discount!
        </p>

        <NewsletterForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} disabled={nextStepEnabled} />

        {nextStepEnabled && (
          <button
            onClick={() => navigate('/user/second-step')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-4"
          >
            Next
          </button>
        )}

        {errorMessage && (
          <div className="bg-red-100 p-4 rounded mt-4">
            <p className="text-red-500">{errorMessage}</p>
            <a
              href="https://solana-last-try-env.eba-pne33s9j.eu-north-1.elasticbeanstalk.com/newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Go to the page
            </a>
          </div>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default FirstStepFeature;
