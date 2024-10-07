import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchAllDigitalAssetWithTokenByOwner } from '@metaplex-foundation/mpl-token-metadata';
import API_URL from '../config/apiConfig';

const API_ENDPOINT = `${API_URL}/nft-discounts`;

export interface NftDiscount {
  id: number;
  nft: string;
  discount: string;
}

const ThirdStepFeature: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [nfts, setNfts] = useState<any[]>([]);
  const [nftDiscounts, setNftDiscounts] = useState<NftDiscount[]>([]);
  const [matchedBonus, setMatchedBonus] = useState<{ nftId: string; discount: string } | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const checkNfts = async () => {
    if (!wallet.publicKey) {
      setMessage('Please connect your wallet to check your discount level.');
      return;
    }

    setLoading(true);

    try {
      const umi = createUmi(connection);
      const ownerPublicKey = publicKey(wallet.publicKey.toString());

      const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
      setNfts(allNFTs);

      const matched = allNFTs.find(nft => nftDiscounts.some(dbNFT => dbNFT.nft === nft.publicKey.toString()));
      if (matched) {
        const discount = nftDiscounts.find(dbNFT => dbNFT.nft === matched.publicKey.toString())?.discount || '';
        setMatchedBonus({ nftId: matched.publicKey.toString(), discount });
        setMessage('');
      } else {
        setMessage('Currently you do not have a NFT required to claim bonus. Contact biuro@megaoklejanie.pl');
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
    fetchNftDiscounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6">
        <div className="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Almost there!</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Now connect your wallet if you haven't already and check your discount level!
        </h2>
        <button
          onClick={handleClaimDiscount}
          disabled={loading || wallet.connecting}
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full ${!wallet.connected && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Checking...' : 'Claim your discount'}
        </button>

        {message && (
          <p className="text-center text-red-500 mt-4">
            {message}
          </p>
        )}

        {matchedBonus && (
          <div className="mt-6 p-4 bg-green-100 rounded">
            <h2 className="text-xl font-bold mb-2 text-center">Congratulations!</h2>
            <p className="text-center">
              You have NFT with ID: <span className="font-mono">{matchedBonus.nftId}</span>
            </p>
            <p className="text-center">
              And fortunately, it allows you a <span className="font-bold">{matchedBonus.discount}</span> discount level!
            </p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ThirdStepFeature;
