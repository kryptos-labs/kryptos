import { Connection, PublicKey } from "@solana/web3.js";
import { handleError } from "../../utils/handleError";
import { getRequest } from "../../utils/httpMethods";

export async function tokenTotalSupply(protocol: string): Promise<number> {
  let tokenSupply = 0;

  try {
  } catch (error: any) {
    handleError(error);
  }

  return tokenSupply;
}
