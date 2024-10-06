import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchAllDigitalAssetWithTokenByOwner } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl } from '@solana/web3.js';

const SolanaSandboxNFT = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [nfts, setNfts] = useState([]);

  const checkNfts = async () => {
    console.log("Fetching NFTs...");
    if (!wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      // Create a UMI instance
      const umi = createUmi(connection);

      // Use the wallet's public key
      const ownerPublicKey = publicKey(wallet.publicKey.toString());

      const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);

      console.log(`Found ${allNFTs.length} NFTs for the owner`);
// @ts-ignore
      setNfts(allNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My NFTs</h1>
      <button className="btn btn-primary mb-4" onClick={checkNfts}>
        Check My NFTs
      </button>

      {nfts.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Token Address</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">URI</th>
            </tr>
          </thead>
          <tbody>
            {nfts.map((nft, index) => (
              <tr key={index}>
                {/* @ts-ignore */}
                <td className="border border-gray-300 p-2">{nft.publicKey.toString()}</td>
                {/* @ts-ignore */}
                <td className="border border-gray-300 p-2">{nft.metadata.name}</td>
                {/* @ts-ignore */}
                <td className="border border-gray-300 p-2">{nft.metadata.symbol}</td>
                <td className="border border-gray-300 p-2">
                {/* @ts-ignore */}
                  <a href={nft.metadata.uri} target="_blank" rel="noopener noreferrer">
                {/* @ts-ignore */}
                    {nft.metadata.uri}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No NFTs found.</p>
      )}
    </div>
  );
};

export default SolanaSandboxNFT;
