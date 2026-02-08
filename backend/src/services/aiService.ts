/**
 * AI Service
 * ----------
 * This module is responsible for transforming structured on-chain wallet
 * metrics into a human-readable reputation report using a large language model.
 *
 * Design goals:
 * - Keep prompt construction separate from route logic
 * - Ensure outputs are structured and predictable
 * - Prevent hallucinations by constraining the model with explicit instructions
 */

import OpenAI from "openai";
import { WalletMetrics } from "../types/wallet";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generates a professional reputation analysis for a wallet.
 *
 * @param metrics - Aggregated behavioral metrics derived from on-chain activity
 * @returns Structured AI-generated wallet reputation profile
 */
export async function generateWalletReputation(metrics: WalletMetrics) {
    /**
     * System prompt defines the role and tone of the AI.
     * It is intentionally strict to reduce speculation and overconfidence.
     */
    const systemPrompt = `
You are a blockchain intelligence analyst generating professional wallet reputation reports.

Rules:
- Be concise, factual, and analytical
- Do NOT invent data that is not provided
- If data is missing, acknowledge uncertainty
- Avoid hype or emotional language
- Focus on behavioral interpretation of on-chain activity
`;

    /**
     * The user prompt provides structured wallet metrics.
     * This ensures the model works from clean signals rather than raw transaction noise.
     */
    const userPrompt = `
Wallet Metrics:
- Wallet Age (days): ${metrics.walletAgeDays}
- Total Transactions: ${metrics.totalTransactions}
- Unique Contracts Interacted With: ${metrics.contractsInteracted}
- First Activity Timestamp: ${metrics.firstTxDate}
- Last Activity Timestamp: ${metrics.lastTxDate}

Tasks:
1. Write a 2–3 sentence professional summary of the wallet's on-chain profile
2. Assign a Risk Level (Low, Medium, High)
3. Provide 3–5 Behavior Tags (comma-separated, e.g., "DeFi User, NFT Collector")

Return your answer STRICTLY as valid JSON in this format:

{
  "summary": "...",
  "risk": "...",
  "behaviorTags": ["...", "...", "..."]
}

Do not include any text outside the JSON.
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2, // Low temperature for more deterministic analysis
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        });

        const choice = completion.choices?.[0];
        const content = choice?.message?.content;

        if (!content) {
            throw new Error("AI response was empty or malformed");
        }
        /**
         * The AI response is returned as structured JSON.
         */
        let parsed;

        try {
            parsed = JSON.parse(content);
        } catch (err) {
            console.error("Failed to parse AI JSON:", content);
            throw new Error("AI returned invalid JSON");
        }

        return {
            summary: parsed.summary,
            risk: parsed.risk,
            behaviorTags: parsed.behaviorTags
        };

    } catch (error) {
        console.error("AI reputation generation failed:", error);
        throw new Error("AI analysis failed");
    }
}
