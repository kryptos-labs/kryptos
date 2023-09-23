import { error } from "console";
import { Whale } from "../../models/whaleModels";
import { defiAddress, solscanAPI } from "./constants";
import { getRequest } from "../../utils/httpMethods";

export async function getWhalesByProtocol(protocol: string): Promise<Whale[]> {
  let whales: Whale[] = [];
  try {
    console.log(protocol);
    let protocolAddress = defiAddress.get(protocol);

    if (protocolAddress === undefined) {
      throw new Error("Protocol address not found");
    }

    let params: Record<string, any> = {
      tokenAddress: protocolAddress,
      limit: 5,
      offset: 0,
    };

    whales = await getRequest(solscanAPI.tokenHolder, params);
  } catch (error) {
    console.log(error);
  }

  return whales;
}
