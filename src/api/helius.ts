import * as dotenv from "dotenv";
dotenv.config();

export async function test() {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS_KEY}`;

  console.log(url);
  const nftAddresses = ["SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp"];
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mintAccounts: nftAddresses,
      includeOffChain: true,
      disableCache: false,
    }),
  });

  const data = await response.json();
  console.log("metadata: ", data);
}
