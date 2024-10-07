import React, { useState } from 'react';

interface NftAddFormProps {
  onAdd: (nft: string, discount: string) => void;
}

export const NftAddForm: React.FC<NftAddFormProps> = ({ onAdd }) => {
  const [nft, setNft] = useState('');
  const [discount, setDiscount] = useState('Rhod');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nft.trim()) {
      onAdd(nft.trim(), discount);
      setNft('');
      setDiscount('Rhod');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          NFT Identifier
        </label>
        <input
          type="text"
          value={nft}
          onChange={(e) => setNft(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter NFT identifier"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discount Level
        </label>
        <select
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Rhod">Rhod</option>
          <option value="Platinum">Platinum</option>
          <option value="Palladium">Palladium</option>
        </select>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add NFT Discount
        </button>
      </div>
    </form>
  );
};
