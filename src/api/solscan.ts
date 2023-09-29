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

interface LargestHoldersResponse {
  data: TokenHolders[];
  total: number;
}

const solscanAPI = {
  tokenHolder: "https://public-api.solscan.io/token/holders?",
  accountTokens: "https://public-api.solscan.io/account/tokens?",
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
