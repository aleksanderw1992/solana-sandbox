import React from 'react';

interface NewsletterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export function NewsletterForm({ email, setEmail, handleSubmit, disabled = false }: NewsletterFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border border-gray-300 p-2 rounded"
        required
        disabled={disabled}
      />
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        Sign Up
      </button>
    </form>
  );
}
