// this is the main file for the solana rpc api

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export async function test() {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  try {
    const version = await connection.getVersion();
    console.log("Connected to Solana mainnet-beta with version:", version);
  } catch (error) {
    console.error("Failed to connect:", error);
  }
}
