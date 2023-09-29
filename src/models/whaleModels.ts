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

type DeFiCategory =
  | "Lending/Borrowing"
  | "DEX"
  | "Yield Aggregators"
  | "Asset Management";

// Define the interface for DeFi protocols
interface Protocol {
  name: string;
  address: string; // Chain address
  type: DeFiCategory[]; // List of types (categories)
}

// Export the interfaces
export type { Whale, TokenHeld, TokenAmount, Protocol };
