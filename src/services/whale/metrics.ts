import { Connection, PublicKey } from "@solana/web3.js";
import { handleError } from "../../utils/handleError";

export async function tokenTotalSupply(protocol: string): Promise<number> {
  let tokenSupply = 0;
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const solendAddress = new PublicKey(
      "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp"
    );

    // Get the total number of holders
    const totalHolders = await connection.getProgramAccounts(solendAddress, {
      filter: [
        {
          memcmp: {
            offset: 0,
            bytes: "SLEND_TOKEN_ACCOUNT",
          },
        },
      ],
    });

    // Get the total token supply
    const totalTokenSupply = await connection.getAccountInfo(solendAddress);

    // Calculate the total token supply from the account balance
    const totalTokenSupplyAmount =
      totalTokenSupply.account.data.readBigUint64LE(0);

    console.log(`Total holders: ${totalHolders.length}`);
    console.log(`Total token supply: ${totalTokenSupplyAmount}`);
  } catch (error: any) {
    throw error;
  }
  return tokenSupply;
}
