export interface WalletMetrics {
    walletAgeDays: number;
    totalTransactions: number;
    contractsInteracted: number;
    firstTxDate: string;
    lastTxDate: string;
}

export interface WalletReputation {
    summary: string;
    risk: string;
    behaviorTags: string[];
}

export interface WalletAnalysisResponse {
    metrics: WalletMetrics;
    reputation: WalletReputation;
}
