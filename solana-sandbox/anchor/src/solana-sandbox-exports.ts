// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import SolanaSandboxIDL from '../target/idl/solana_sandbox.json';
import type { SolanaSandbox } from '../target/types/solana_sandbox';

// Re-export the generated IDL and type
export { SolanaSandbox, SolanaSandboxIDL };

// The programId is imported from the program IDL.
export const SOLANA_SANDBOX_PROGRAM_ID = new PublicKey(
  SolanaSandboxIDL.address
);

// This is a helper function to get the SolanaSandbox Anchor program.
export function getSolanaSandboxProgram(provider: AnchorProvider) {
  return new Program(SolanaSandboxIDL as SolanaSandbox, provider);
}

// This is a helper function to get the program ID for the SolanaSandbox program depending on the cluster.
export function getSolanaSandboxProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return SOLANA_SANDBOX_PROGRAM_ID;
  }
}
