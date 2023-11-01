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
      await getAccountTokens(
        new PublicKey("v36Pdq4kjUhrUBnYzZLa4HReBXpyVRCwxQ9Bkk2i8YC")
      );
      break;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProgramAccounts(pubkey: PublicKey) {
  try {
    const accounts = await connection.getProgramAccounts(
      new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo")
    );

    for (const account of accounts) {
      console.log(account);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAccountTokens(pubkey: PublicKey) {
  try {
  } catch (error) {
    console.log(error);
  }
}
