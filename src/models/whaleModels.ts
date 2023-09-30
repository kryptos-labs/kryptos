interface ProtocolWhale {
  protocolAddress: string;
  amount: number; // number of tokens held
  tokensHeld: TokenHeld[]; // // list of tokens held my owner wallet
  owner: string; // owner wallet address
  supplyRatio: number; // percentage of total supply held
}

interface TokenHeld {
  tokenAddress: string;
  symbol: string;
  amount: number;
  account: string;
  tokenRatio: number; // value of token held as a percentage of total value of all tokens held
}

// interface TokenAmount {
//   amount: string;
//   decimals: number;
//   uiAmount: number;
//   uiAmountString: string;
// }

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
export type { ProtocolWhale, TokenHeld, Protocol };
