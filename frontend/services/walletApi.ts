import { WalletAnalysisResponse } from "@/types/wallet";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Call the backend to get wallet metrics + AI reputation
 */
export async function fetchWalletAnalysis(address: string): Promise<WalletAnalysisResponse> {
    const res = await fetch(`${API_BASE}/wallet/${address}`);

    if (!res.ok) {
        throw new Error("Failed to fetch wallet analysis");
    }

    return res.json();
}
