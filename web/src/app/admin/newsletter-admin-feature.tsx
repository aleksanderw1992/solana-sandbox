import React, { useEffect, useState } from 'react';
import API_URL from '../config/apiConfig';
import toast from 'react-hot-toast';

const API_ENDPOINT = `${API_URL}/newsletter`;

interface NewsletterEntry {
  id: number;
  email: string;
}

const NewsletterAdminFeature: React.FC = () => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [newsletterList, setNewsletterList] = useState<NewsletterEntry[]>([]);

  // Fetch all signed up emails
  const fetchEmails = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    setNewsletterList(data);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSendEmail = () => {
    toast.success("Email sent!");
    setEmailTemplate(''); // Clear input
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Newsletter Admin</h1>

        <div className="mb-8">
          <textarea
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your email template here..."
          />
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
          >
            Send Email
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Newsletter Signups</h2>
        <ul className="list-disc ml-5">
          {newsletterList.map((entry) => (
            <li key={entry.id}>{entry.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsletterAdminFeature;
