import React from 'react';
import { NftDiscount } from './nft-admin-feature';

interface NftListProps {
  nftDiscounts: NftDiscount[];
  onDelete: (id: number) => void;
}

export const NftList: React.FC<NftListProps> = ({ nftDiscounts, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Existing NFT Discounts</h2>
      {nftDiscounts.length === 0 ? (
        <p className="text-gray-500">No NFT discounts available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  NFT Identifier
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Discount Level
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {nftDiscounts.map((nftDiscount) => (
                <tr key={nftDiscount.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {nftDiscount.nft}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {nftDiscount.discount.charAt(0).toUpperCase() + nftDiscount.discount.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-center">
                    <button
                      onClick={() => onDelete(nftDiscount.id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                    {/* Hidden ID field, not visible in UI */}
                    <input type="hidden" value={nftDiscount.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
