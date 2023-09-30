import { ProtocolWhale, TokenHeld } from "../../models/whaleModels";
import { ProtocolInfo } from "../../constants/protocols";
import {
  getAccountTokens,
  getLargestHolders,
  getTokenMeta,
  TokenHolders,
  AccountToken,
} from "../../api/solscan";
import { handleError } from "../../utils/handleError";
import { tokenTotalSupply } from "./metrics";
import { Token } from "typescript";

export async function getWhalesByProtocol(
  symbol: string
): Promise<ProtocolWhale[]> {
  let whales: ProtocolWhale[] = [];

  const limit = 1;
  const offset = 19;
  try {
    let address = ProtocolInfo[symbol].address;

    if (address === undefined) {
      handleError(new Error("Protocol address not found"));
    }

    let tokenMetaData = await getTokenMeta(address);

    let largestHolders: TokenHolders[] = await getLargestHolders(
      address,
      limit,
      offset
    );

    for (let holder of largestHolders) {
      let whale: ProtocolWhale;

      let tokensHeld: AccountToken[] = await getAccountTokens(holder.owner);

      let ownerTokens: TokenHeld[] = [];

      for (var token of tokensHeld) {
        let ownerToken: TokenHeld = {
          tokenAddress: token.tokenAddress,
          symbol: token.tokenSymbol,
          amount: token.tokenAmount.uiAmount,
          account: token.tokenAccount,
          tokenRatio: 0,
        };
        ownerTokens.push(ownerToken);
      }

      whale = {
        protocolAddress: holder.address,
        amount: Number(holder.amount) / Math.pow(10, holder.decimals),
        owner: holder.owner,
        tokensHeld: ownerTokens,
        supplyRatio:
          (Number(holder.amount) / Number(tokenMetaData.supply)) * 100,
      };

      whales.push(whale);
    }
  } catch (error) {
    handleError(error);
  }

  return whales;
}
