import * as dotenv from "dotenv";
import { Connection, PublicKey } from "@solana/web3.js";
dotenv.config();

export async function getLargestHolders(pubkey: PublicKey) {
  const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_KEY}`;

  const connection = new Connection(url, "confirmed");

  const response = await connection.getTokenLargestAccounts(
    new PublicKey(pubkey),
    "confirmed"
  );

  console.log("metadata: ", response);
}
