import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { SolanaSandbox } from '../target/types/solana_sandbox';

describe('solana-sandbox', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.SolanaSandbox as Program<SolanaSandbox>;

  const solanaSandboxKeypair = Keypair.generate();

  it('Initialize SolanaSandbox', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanaSandbox: solanaSandboxKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanaSandboxKeypair])
      .rpc();

    const currentCount = await program.account.solanaSandbox.fetch(
      solanaSandboxKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment SolanaSandbox', async () => {
    await program.methods
      .increment()
      .accounts({ solanaSandbox: solanaSandboxKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solanaSandbox.fetch(
      solanaSandboxKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment SolanaSandbox Again', async () => {
    await program.methods
      .increment()
      .accounts({ solanaSandbox: solanaSandboxKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solanaSandbox.fetch(
      solanaSandboxKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement SolanaSandbox', async () => {
    await program.methods
      .decrement()
      .accounts({ solanaSandbox: solanaSandboxKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solanaSandbox.fetch(
      solanaSandboxKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set solanaSandbox value', async () => {
    await program.methods
      .set(42)
      .accounts({ solanaSandbox: solanaSandboxKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solanaSandbox.fetch(
      solanaSandboxKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the solanaSandbox account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanaSandbox: solanaSandboxKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanaSandbox.fetchNullable(
      solanaSandboxKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
