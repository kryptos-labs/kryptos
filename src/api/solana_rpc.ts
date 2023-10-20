// this is the main file for the solana rpc api

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("mainnet-beta"));

export async function getTopHolders(publicKey: PublicKey) {
  try {
    const mintAddress = new PublicKey(
      "SLNDpmoWva5oaBNrZfV8QksLZByp8c3bDjHqvnECmwE"
    );

    const tokenAccounts = await connection.getTokenSupply(mintAddress);

    console.log(tokenAccounts);
  } catch (e) {
    console.log(e);
  }
  // tokenAccounts.sort((a, b) => b.amount - a.amount);

  // const topTokenAccounts = tokenAccounts.slice(0, 10);

  // return topTokenAccounts.map((tokenAccount) => tokenAccount.publicKey);

  // tokenAccounts.sort((a, b) => b.amount - a.amount);

  // const topTokenAccounts = tokenAccounts.slice(0, 10);

  // return topTokenAccounts.map((tokenAccount) => tokenAccount.publicKey);
}
