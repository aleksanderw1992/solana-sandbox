import React, { useState } from 'react';
import { NewsletterForm } from './newsletter-ui';
import toast, { Toaster } from 'react-hot-toast';
import API_URL from '../config/apiConfig';

const API_ENDPOINT = `${API_URL}/newsletter`;

export default function NewsletterFeature() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Successfully signed up for the newsletter!');
        setEmail('');
      } else {
        const data = await response.json();
        toast.error(data.error || 'An error occurred');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up for Our Newsletter</h1>
      <NewsletterForm
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
      <Toaster />
    </div>
  );
}
