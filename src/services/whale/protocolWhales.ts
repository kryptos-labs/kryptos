import { Whale } from "../../models/whaleModels";
import { ProtocolInfo } from "../../constants/protocols";
import {
  getLargestHolders,
  getTokenMeta,
  TokenHolders,
} from "../../api/solscan";
import { handleError } from "../../utils/handleError";
import { tokenTotalSupply } from "./metrics";
import { Token } from "typescript";

export async function getWhalesByProtocol(symbol: string): Promise<Whale[]> {
  let whales: Whale[] = [];

  const limit = 5;
  const offset = 0;
  try {
    let address = ProtocolInfo[symbol].address;

    if (address === undefined) {
      handleError(new Error("Protocol address not found"));
    }

    await getTokenMeta(address);

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
