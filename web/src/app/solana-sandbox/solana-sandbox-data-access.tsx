import {
  getSolanaSandboxProgram,
  getSolanaSandboxProgramId,
} from '@solana-sandbox/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useSolanaSandboxProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getSolanaSandboxProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getSolanaSandboxProgram(provider);

  const accounts = useQuery({
    queryKey: ['solana-sandbox', 'all', { cluster }],
    queryFn: () => program.account.solanaSandbox.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['solana-sandbox', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ solanaSandbox: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useSolanaSandboxProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useSolanaSandboxProgram();

  const accountQuery = useQuery({
    queryKey: ['solana-sandbox', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanaSandbox.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['solana-sandbox', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ solanaSandbox: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['solana-sandbox', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ solanaSandbox: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['solana-sandbox', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ solanaSandbox: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['solana-sandbox', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ solanaSandbox: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
