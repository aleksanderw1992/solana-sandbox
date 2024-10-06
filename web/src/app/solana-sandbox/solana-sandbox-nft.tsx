import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz';

const SolanaSandboxNFT = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [nfts, setNfts] = useState([]);

  const checkNfts = async () => {
    console.log("clicked");
    if (!wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      const nftsData = await getParsedNftAccountsByOwner({
        publicAddress: wallet.publicKey.toString(),
        connection: connection as Connection,
      });
      // @ts-ignore
      setNfts(nftsData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My NFTs</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={checkNfts}
      >
        Check My NFTs
      </button>

      {nfts.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Token Address</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">URI</th>
            </tr>
          </thead>
          <tbody>
            {nfts.map((nft, index) => (
              <tr key={index}>
                {/* @ts-ignore */}
                <td className="border border-gray-300 p-2">{nft.mint}</td>
                {/* @ts-ignore */}
                <td className="border border-gray-300 p-2">{nft.data.name}</td>
                <td className="border border-gray-300 p-2">
                  {/* @ts-ignore */}
                  <a href={nft.data.uri} target="_blank" rel="noopener noreferrer">
                    {/* @ts-ignore */}
                    {nft.data.uri}
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
