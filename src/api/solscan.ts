import { Whale } from "../models/whaleModels";
import { handleError } from "../utils/handleError";
import { getRequest } from "../utils/httpMethods";

export interface TokenHolders {
  address: string;
  amount: number;
  decimals: number;
  owner: string;
  rank: number;
}

interface AccountToken {
  tokenAddress: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
  tokenAccount: string;
  tokenName: string;
  tokenIcon: string;
  rentEpoch: number;
  lamports: number;
  tokenSymbol: string;
}

interface LargestHoldersResponse {
  data: TokenHolders[];
  total: number;
}

interface TokenMeta {
  name: string;
  symbol: string;
  price: number;
  volume: number;
  decimals: number;
  tokenAuthority: string;
  supply: string;
  type: string;
  address: string;
  icon: string;
}

const solscanAPI = {
  tokenHolder: "https://public-api.solscan.io/token/holders?",
  accountTokens: "https://public-api.solscan.io/account/tokens?",
  tokenMeta: "https://public-api.solscan.io/token/meta?",
};

export async function getLargestHolders(
  address: string,
  limit: number,
  offset: number
): Promise<TokenHolders[]> {
  let largestHolders: TokenHolders[] = [];

  let params: Record<string, any> = {
    tokenAddress: address,
    limit: limit,
    offset: offset,
  };

  try {
    let response: LargestHoldersResponse = await getRequest(
      solscanAPI.tokenHolder,
      params
    );
    largestHolders = response.data;
  } catch (error: any) {
    handleError(new Error(error.message));
  }

  return largestHolders;
}

export async function getTokenMeta(address: string): Promise<TokenMeta> {
  let params: Record<string, any> = {
    tokenAddress: address,
  };

  try {
    return await getRequest(solscanAPI.tokenMeta, params);
  } catch (error: any) {
    handleError(error);
    throw error;
  }
}

export async function getAccountTokens(owner: string): Promise<AccountToken[]> {
  let params: Record<string, any> = {
    account: owner,
  };

  try {
    return await getRequest(solscanAPI.accountTokens, params);
  } catch (error: any) {
    handleError(error);
    throw error;
  }
}
