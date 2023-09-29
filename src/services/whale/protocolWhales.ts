import { Whale } from "../../models/whaleModels";
import { defiAddress } from "../../constants/protocols";
import { getLargestHolders, TokenHolders } from "../../api/solscan";
import { handleError } from "../../utils/handleError";
import { tokenTotalSupply } from "./metrics";
import { Token } from "typescript";

export async function getWhalesByProtocol(protocol: string): Promise<Whale[]> {
  let whales: Whale[] = [];

  const limit = 5;
  const offset = 0;

  let address = defiAddress[protocol].address;

  if (address === undefined) {
    handleError(new Error("Protocol address not found"));
  }
  try {
    let largestHolders: TokenHolders[] = await getLargestHolders(
      address,
      limit,
      offset
    );
  } catch (error) {
    handleError(error);
  }

  return whales;
}
