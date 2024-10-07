import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchAllDigitalAssetWithTokenByOwner } from '@metaplex-foundation/mpl-token-metadata';
import API_URL from '../config/apiConfig';

const API_ENDPOINT = `${API_URL}/nft-discounts`;

export interface NftDiscount {
  id: number;
  nft: string; // NFT identifier (e.g., mint address)
  discount: string; // Discount level
}

const ThirdStepFeature: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [nfts, setNfts] = useState<any[]>([]); // NFTs owned by the user
  const [nftDiscounts, setNftDiscounts] = useState<NftDiscount[]>([]); // NFT discounts from the API
  const [bonuses, setBonuses] = useState<NftDiscount[]>([]); // Matched NFTs with discounts
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Fetch NFT discounts from the API
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
    }
  };

  // Step 2: Fetch user NFTs from their connected wallet
  const checkNfts = async () => {
    if (!wallet.publicKey) {
      setMessage('Please connect your wallet to claim your discount.');
      return;
    }

    setLoading(true);

    try {
      const umi = createUmi(connection);
      const ownerPublicKey = publicKey(wallet.publicKey.toString());

      const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
      setNfts(allNFTs);

      // Step 3: Compare NFTs with the discounts from the API
      const matchedNFTs = allNFTs
        .filter(nft => nftDiscounts.some(dbNFT => dbNFT.nft === nft.publicKey.toString()))
        .map(nft => nftDiscounts.find(dbNFT => dbNFT.nft === nft.publicKey.toString()));

      if (matchedNFTs.length > 0) {
        setBonuses(matchedNFTs as NftDiscount[]); // Save the matched NFTs with their discounts
        setMessage('');
      } else {
        setMessage('Currently, you do not have an NFT required to claim a bonus. Contact biuro@megaoklejanie.pl.');
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setMessage('Error fetching NFTs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimDiscount = () => {
    if (!wallet.connected) {
      wallet.connect();
    } else {
      checkNfts();
    }
  };

  useEffect(() => {
    // Fetch discounts when the component loads
    fetchNftDiscounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Claim Your Discount</h1>

        <p className="text-center mb-4">
          You can claim your discount with your NFT.
        </p>

        <button
          className="btn btn-primary mb-4"
          onClick={handleClaimDiscount}
          disabled={loading || wallet.connecting}
        >
          {loading ? 'Checking...' : 'Claim your discount'}
        </button>

        {message && <p className="text-center text-red-500">{message}</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {bonuses.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-4">Available Discounts:</h3>
            <ul>
              {bonuses.map((bonus, index) => (
                <li key={index}>
                  NFT ID: {bonus.nft} - Discount Level: {bonus.discount}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdStepFeature;
