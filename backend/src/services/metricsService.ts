/**
 * Take raw blockchain transactions and turn them into behavioral metrics.
 * This is the "analytics brain" before AI writes the human-readable report.
 */

import { SimpleTx, WalletMetrics } from "../types/wallet";

/**
 * Calculate high-level stats about a wallet's history.
 */
export function computeWalletMetrics(
    address: string,
    txs: SimpleTx[]
): WalletMetrics {
    // Case where there are no transactions
    if (!txs || txs.length === 0) {
        return {
            walletAgeDays: 0,
            totalTransactions: 0,
            uniqueProtocols: [],
            contractsInteracted: 0,
            firstTxDate: null,
            lastTxDate: null
        };
    }

    // Sort transactions from oldest to newest
    const sorted = [...txs].sort((a, b) => a.timestamp - b.timestamp);

    const firstTx = sorted[0];
    const lastTx = sorted[sorted.length - 1];

    if (!firstTx || !lastTx) {
        return {
            walletAgeDays: 0,
            totalTransactions: txs.length,
            uniqueProtocols: [],
            contractsInteracted: 0,
            firstTxDate: null,
            lastTxDate: null
        };
    }

    // Calculate how old the wallet is based on its first activity
    const walletAgeDays =
        (Date.now() - firstTx.timestamp) / (1000 * 60 * 60 * 24);

    // Count unique addresses this wallet has interacted with
    const uniqueAddresses = new Set(
        txs.map((tx) => tx.to?.toLowerCase()).filter(Boolean)
    );

    // Helper: format timestamp as YYYY-MM-DD
    const formatDate = (ts: number) => {
        const d = new Date(ts);
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const day = String(d.getUTCDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    };

    return {
        walletAgeDays: Math.floor(walletAgeDays),
        totalTransactions: txs.length,
        uniqueProtocols: [], // Classify these later
        contractsInteracted: uniqueAddresses.size,
        firstTxDate: formatDate(firstTx.timestamp),
        lastTxDate: formatDate(lastTx.timestamp)
    };
}

