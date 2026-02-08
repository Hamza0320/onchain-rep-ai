/**
 * Define API endpoints related to wallet reputation analysis.
 * The frontend will call me to get structured wallet metrics.
 */

import { Router } from "express";
import { fetchTransactions } from "../services/alchemyService";
import { computeWalletMetrics } from "../services/metricsService";
import { generateWalletReputation } from "../services/aiService";

const router = Router();

/**
 * GET /api/wallet/:address
 * Analyze a wallet and return structured behavioral metrics.
 */
router.get("/:address", async (req, res) => {
    const { address } = req.params;

    try {
        // Fetch raw blockchain activity
        const transactions = await fetchTransactions(address);

        // Turn raw activity into meaningful metrics
        const metrics = computeWalletMetrics(address, transactions);

        // AI layer converts metrics into human-readable intelligence
        const reputation = await generateWalletReputation(metrics);

        res.json({
            metrics,
            reputation
        });
    } catch (err) {
        console.error("Wallet analysis failed:", err);
        res.status(500).json({ error: "Failed to analyze wallet" });
    }
});

export default router;
