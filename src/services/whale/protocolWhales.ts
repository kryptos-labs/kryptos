import { error } from "console";
import { Whale } from "../../models/whaleModels";
import { defiAddress, solscanAPI } from "./constants";
import { getRequest } from "../../utils/httpMethods";

import { handleError } from "../../utils/handleError";

interface getWhalesByProtocolResponse {
  data: Whale[];
  total: number;
}

export async function getWhalesByProtocol(protocol: string): Promise<Whale[]> {
  let whales: Whale[] = [];

  let protocolAddress = defiAddress.get(protocol);

  if (protocolAddress === undefined) {
    throw new Error("Protocol address not found");
  }

  let params: Record<string, any> = {
    tokenAddress: protocolAddress,
    limit: 5,
    offset: 0,
  };

  let response: getWhalesByProtocolResponse = await getRequest(
    solscanAPI.tokenHolder,
    params
  );

  whales = response.data;

  return whales;
}
