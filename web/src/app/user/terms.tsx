import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6">Terms of Conduct</h1>
        <p className="mb-4">
          Welcome to Gigawrap! By accessing and using our services, you agree to comply with the following Terms of Conduct.
        </p>
        <h2 className="text-xl font-semibold mb-2">Respect and Integrity</h2>
        <p className="mb-4">
          Treat all members of our community with respect. Harassment, hate speech, and any form of discriminatory behavior are strictly prohibited.
        </p>
        <h2 className="text-xl font-semibold mb-2">Prohibited Content</h2>
        <p className="mb-4">
          Do not share or distribute illegal, harmful, or inappropriate content. This includes, but is not limited to, copyrighted material without permission, explicit content, and malicious software.
        </p>
        <h2 className="text-xl font-semibold mb-2">Account Responsibility</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account information. Any activities performed under your account are your responsibility.
        </p>
        <h2 className="text-xl font-semibold mb-2">Consequences of Violation</h2>
        <p>
          Violations of these terms may result in actions including, but not limited to, content removal, account suspension, or termination. We reserve the right to enforce these terms at our discretion.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
