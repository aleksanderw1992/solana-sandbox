import React, { useEffect, useState } from 'react';
import { NftAddForm } from './nft-add-form';
import { NftList } from './nft-list';

import API_URL from '../../config/apiConfig';

const API_ENDPOINT = `${API_URL}/nft-discounts`;

export interface NftDiscount {
  id: number;
  nft: string;
  discount: string;
}

const NftAdminFeature: React.FC = () => {
  const [nftDiscounts, setNftDiscounts] = useState<NftDiscount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch all NFT discounts
  const fetchNftDiscounts = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}`);
      if (!response.ok) {
        throw new Error('Failed to fetch NFT discounts');
      }
      const data = await response.json();
      setNftDiscounts(data);
    } catch (error: any) {
      console.error('Error fetching NFT discounts', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNftDiscounts();
  }, []);

  // Add new NFT discount
  const addNftDiscount = async (nft: string, discount: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nft, discount }),
      });
      if (!response.ok) {
        throw new Error('Failed to add NFT discount');
      }
      const newNftDiscount = await response.json();
      setNftDiscounts([...nftDiscounts, newNftDiscount]);
    } catch (error: any) {
      console.error('Error adding NFT discount', error);
      setError(error.message);
    }
  };

  // Delete an NFT discount
  const deleteNftDiscount = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete NFT discount');
      }
      setNftDiscounts(nftDiscounts.filter((nftDiscount) => nftDiscount.id !== id));
    } catch (error: any) {
      console.error('Error deleting NFT discount', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">NFT Discounts Admin</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-8">
          <NftAddForm onAdd={addNftDiscount} />
        </div>

        <div>
          {loading ? (
            <div className="text-center text-gray-500">Loading NFT Discounts...</div>
          ) : (
            <NftList nftDiscounts={nftDiscounts} onDelete={deleteNftDiscount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NftAdminFeature;
