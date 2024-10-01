import React, { useState } from 'react';
import { NewsletterForm } from './newsletter-ui';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL ||
  "https://solana-last-try-env.eba-pne33s9j.eu-north-1.elasticbeanstalk.com/newsletter";

export default function NewsletterFeature() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation on the client-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    try {
      console.log(JSON.stringify({ email }));
      const response = await fetch(API_URL, {
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
