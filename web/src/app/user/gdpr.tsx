
import React from 'react';

const GDPRPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6">GDPR Policy</h1>
        <p className="mb-4">
          At Gigawrap, we are committed to protecting your privacy. This GDPR Policy explains how we collect, use, and safeguard your personal data in compliance with the General Data Protection Regulation (GDPR).
        </p>
        <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
        <p className="mb-4">
          We collect personal information such as your name, email address, and other relevant data to provide and improve our services. All data is collected with your explicit consent.
        </p>
        <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
        <p className="mb-4">
          Your data is used to personalize your experience, respond to your inquiries, and send you relevant updates. We do not sell or share your personal information with third parties without your permission.
        </p>
        <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
        <p className="mb-4">
          We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. Your information is stored securely and is only accessible by authorized personnel.
        </p>
        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p>
          You have the right to access, correct, or request the deletion of your personal data at any time. To exercise these rights, please contact us at biuro@megaoklejanie.pl.
        </p>
      </div>
    </div>
  );
};

export default GDPRPage;
