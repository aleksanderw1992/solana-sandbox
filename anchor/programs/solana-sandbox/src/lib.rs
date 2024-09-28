#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("6yG5UEezgvxvXRr25nFQ5c2uKh3QbhhU7xLzXb61j4My");

#[program]
pub mod solana_sandbox {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanaSandbox>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solana_sandbox.count = ctx.accounts.solana_sandbox.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solana_sandbox.count = ctx.accounts.solana_sandbox.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanaSandbox>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solana_sandbox.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanaSandbox<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + SolanaSandbox::INIT_SPACE,
  payer = payer
  )]
  pub solana_sandbox: Account<'info, SolanaSandbox>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanaSandbox<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solana_sandbox: Account<'info, SolanaSandbox>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solana_sandbox: Account<'info, SolanaSandbox>,
}

#[account]
#[derive(InitSpace)]
pub struct SolanaSandbox {
  count: u8,
}
