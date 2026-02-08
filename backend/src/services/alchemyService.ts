/**
 * Responsible for talking to the blockchain through Alchemy.
 * Fetch raw transaction data that will later be turned into metrics.
 */

import axios from "axios";
import { SimpleTx } from "../types/wallet";
import dotenv from "dotenv";

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

if (!ALCHEMY_API_KEY) {
    throw new Error("Missing ALCHEMY_API_KEY in environment variables");
}

const BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

/**
 * Fetch normal transactions for a wallet address.
 * Keep it simple and only grab a limited recent set.
 */
export async function fetchTransactions(address: string): Promise<SimpleTx[]> {
    try {
        const response = await axios.post(BASE_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: [
                {
                    fromBlock: "0x0",
                    toBlock: "latest",
                    fromAddress: address,
                    category: ["external", "erc20", "erc721", "erc1155"],
                    withMetadata: true,
                    maxCount: "0x3e8" // Limit to ~1000 transfers for performance
                }
            ]
        });

        const transfers = response.data.result.transfers;

        // Transform Alchemy's response into my simplified transaction format
        return transfers.map((tx: any) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || null,
            value: parseFloat(tx.value || "0"),
            timestamp: new Date(tx.metadata.blockTimestamp).getTime()
        }));
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}
