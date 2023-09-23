interface Whale {
  address: string;
  amount: number;
  decimals: number;
  owner: string;
  rank: number;
}

interface TokenHeld {
  tokenAddress: string;
  tokenAmount: TokenAmount;
}

interface TokenAmount {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

// Export the interfaces
export type { Whale, TokenHeld, TokenAmount };
