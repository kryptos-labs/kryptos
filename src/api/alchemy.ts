import dotenv from "dotenv";
import solanaWeb3 from "@solana/web3.js";
dotenv.config();

let rpc = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;

export const alchemyWeb3 = new solanaWeb3.Connection(rpc, "confirmed");

export async function alchemy(method: string, params: any) {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: method,
      params: params,
    }),
  };

  let response = await fetch(rpc, options);

  return response.json();
}
