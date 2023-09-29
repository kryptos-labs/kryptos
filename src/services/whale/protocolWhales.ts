import { error } from "console";
import { Whale } from "../../models/whaleModels";
import { defiAddress } from "../../constants/protocols";
import { solscanAPI } from "../../constants/dataEndpoints";
import { getRequest } from "../../utils/httpMethods";

import { handleError } from "../../utils/handleError";
import { tokenTotalSupply } from "./metrics";

interface getWhalesByProtocolResponse {
  data: Whale[];
  total: number;
}

export async function getWhalesByProtocol(protocol: string): Promise<Whale[]> {
  let whales: Whale[] = [];

  let protocolAddress = defiAddress[protocol].address;

  if (protocolAddress === undefined) {
    handleError(new Error("Protocol address not found"));
  }

  let params: Record<string, any> = {
    tokenAddress: protocolAddress,
    limit: 5,
    offset: 0,
  };

  try {
    tokenTotalSupply(protocolAddress);

    let response: getWhalesByProtocolResponse = await getRequest(
      solscanAPI.tokenHolder,
      params
    );
    whales = response.data;
  } catch (error: any) {
    handleError(new Error(error.message));
  }

  return whales;
}
