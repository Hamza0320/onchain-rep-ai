import { useQuery } from "@tanstack/react-query";
import { fetchWalletAnalysis } from "@/services/walletApi";
import { WalletAnalysisResponse } from "@/types/wallet";

export function useWalletAnalysis(address?: string) {
    return useQuery<WalletAnalysisResponse>({
        queryKey: ["walletAnalysis", address],
        queryFn: () => fetchWalletAnalysis(address!),
        enabled: !!address, // only fetch when address is set
        staleTime: 60_000,  // cache for 1 minute
    });
}
