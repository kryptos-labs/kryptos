import { ProtocolWhale, Symbol, TokenHeld } from "../../models/whaleModels";

import { ProtocolInfo } from "../../constants/protocols";
import {
  getAccountTokens,
  getTokenMeta,
  TokenHolders,
  AccountToken,
  TokenMeta,
} from "../../api/solscan";
import { Connection, PublicKey } from "@solana/web3.js";
import { getTopHolders } from "../../api/solana_rpc";
import { handleError } from "../../utils/handleError";
import { tokenTotalSupply } from "./metrics";
import { Token } from "typescript";
import { getLargestHolders } from "../../api/helius";

export async function getWhalesByProtocol(
  symbol: string
): Promise<ProtocolWhale[]> {
  let whales: ProtocolWhale[] = [];

  const limit = 1;

  const offset = 15;

  try {
    let address = ProtocolInfo[symbol].address;
    if (address === undefined) {
      handleError(new Error("Protocol address not found"));
    }

    let protocolPublicKey = new PublicKey(address);

    getLargestHolders(protocolPublicKey);
  } catch (error) {
    console.log(error);
  }

  // try {
  //   let address = ProtocolInfo[symbol].address;
  //   if (address === undefined) {
  //     handleError(new Error("Protocol address not found"));
  //   }
  //   getTopHolders(new PublicKey(address));

  //   // Get the protocol address

  //   // Get the token metadata of the current Defi protocol
  //   let tokenMetaData: TokenMeta = await getTokenMeta(address);

  //   // Get the largest holders of the protocol token
  //   let largestHolders: TokenHolders[] = await getLargestHolders(
  //     address,
  //     limit,
  //     offset
  //   );

  //   // (caching tokenMeta) list of tokenMeta for each token held by the whale mapped to symbol
  //   let tokenMetaMap: Map<string, TokenMeta> = new Map();

  //   for (let holder of largestHolders) {
  //     let whale: ProtocolWhale;

  //     let tokensHeld: AccountToken[] = await getAccountTokens(holder.owner);

  //     let ownerTokens: TokenHeld[] = [];

  //     let walletTotalValue = 0;

  //     for (var token of tokensHeld) {
  //       let tokenHeldMetaData: TokenMeta | undefined = undefined;

  //       if (!tokenMetaMap.has(token.tokenSymbol)) {
  //         tokenHeldMetaData = await getTokenMeta(token.tokenAddress);
  //         tokenMetaMap.set(token.tokenSymbol, tokenHeldMetaData);
  //       }

  //       if (tokenHeldMetaData === undefined) {
  //         continue;
  //         throw new Error("Token metadata not found");
  //       }

  //       if (tokenHeldMetaData.price === undefined) {
  //         // console.log(tokenHeldMetaData);
  //         continue;
  //         throw new Error("Token price not found");
  //       }

  //       if (token.tokenAmount.uiAmount === 0) {
  //         continue;
  //       }
  //       let tokenPrice = tokenHeldMetaData.price;

  //       let tokenValue = token.tokenAmount.uiAmount * tokenPrice;

  //       walletTotalValue += tokenValue;

  //       let ownerToken: TokenHeld = {
  //         tokenAddress: token.tokenAddress,
  //         symbol: token.tokenSymbol,
  //         amount: token.tokenAmount.uiAmount,
  //         account: token.tokenAccount,
  //         value: tokenValue,
  //         portfolioRatio: 0,
  //       };
  //       ownerTokens.push(ownerToken);
  //     }

  //     // Calculate the token ratio for each token held by the whale
  //     for (let token of ownerTokens) {
  //       token.portfolioRatio = (token.value / walletTotalValue) * 100;

  //       // assign the token ration to ownerTokens
  //       ownerTokens = ownerTokens.map((ownerToken) => {
  //         if (ownerToken.symbol === token.symbol) {
  //           ownerToken.portfolioRatio = token.portfolioRatio;
  //         }
  //         return ownerToken;
  //       });
  //     }

  //     whale = {
  //       protocolAddress: holder.address,
  //       amount: Number(holder.amount) / Math.pow(10, holder.decimals),
  //       owner: holder.owner,
  //       tokensHeld: ownerTokens,
  //       supplyRatio:
  //         (Number(holder.amount) / Number(tokenMetaData.supply)) * 100,
  //     };

  //     whales.push(whale);
  //   }
  // } catch (error) {
  //   handleError(error);
  // }

  return whales;
}

export async function getAllWhales(): Promise<
  Record<Symbol, ProtocolWhale[]> | undefined
> {
  let allWhales: Record<Symbol, ProtocolWhale[]> = {};

  for (let symbol in ProtocolInfo) {
    try {
      let whales: ProtocolWhale[] = await getWhalesByProtocol(symbol);

      allWhales[symbol] = whales;
    } catch (error) {
      handleError(error);
      throw error;
    }
    if (symbol === "JET") {
      break;
    }
  }

  return allWhales;
}
