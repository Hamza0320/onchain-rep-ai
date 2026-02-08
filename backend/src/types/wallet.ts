/**
 * Define TypeScript types used across the wallet analysis system.
 * Having these types helps me keep data structured and predictable.
 */

// Simplified blockchain transaction
export interface SimpleTx {
    hash: string;
    from: string;
    to: string | null;
    value: number;
    timestamp: number;
}

// Represent aggregated wallet metrics that AI will later analyze
export interface WalletMetrics {
    walletAgeDays: number;
    totalTransactions: number;
    uniqueProtocols: string[];
    contractsInteracted: number;
    firstTxDate: string | null;
    lastTxDate: string | null;
}
