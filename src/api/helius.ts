import * as dotenv from "dotenv";
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
  TokenAccountsFilter,
} from "@solana/web3.js";
import { get } from "http";
dotenv.config();

const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_KEY}`;

const connection = new Connection(url, "confirmed");

export async function getLargestHolders(pubkey: PublicKey) {
  try {
    const response = await connection.getTokenLargestAccounts(
      pubkey,
      "confirmed"
    );

    for (const account of response.value) {
      await getAccountTokens(account.address);
      break;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAccounts(pubkey: PublicKey) {
  try {
    const accounts = await connection.getProgramAccounts(
      new PublicKey("TokenkegQfeZyiwj5kMgpg55BH5nAnbhjN49HWN6AdT")
    );

    for (const account of accounts) {
      console.log(account);
    }

    console.log(accounts);
  } catch (error) {
    console.log(error);
  }
}

export async function getAccountTokens(pubkey: PublicKey) {
  //filter
  const filter: TokenAccountsFilter = {
    programId: new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo"),
  };

  let accountTokens = await connection.getProgramAccounts(
    new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo")
  );

  console.log(accountTokens);
}
