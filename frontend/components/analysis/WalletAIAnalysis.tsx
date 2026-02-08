import { WalletReputation, WalletMetrics } from "@/types/wallet";
import { Card } from "../ui/Card";
import { RiskBadge } from "../ui/Badge";


interface Props {
    metrics: WalletMetrics;
    reputation: WalletReputation;
}

export function WalletAIAnalysis({ metrics, reputation }: Props) {
    return (
        <Card>
            <h3 className="font-semibold text-white mb-2">Wallet Summary</h3>

            {/* AI Summary */}
            <p className="text-sm text-gray-300 mb-2">{reputation.summary}</p>

            <h3 className="font-semibold text-white mb-2">Risk level</h3>
            {/* Risk badge*/}
            {reputation.risk && (
                <RiskBadge
                    level={reputation.risk.toLowerCase() as "low" | "medium" | "high"}
                />
            )}

            {/* Behavior tags */}
            {reputation.behaviorTags && (
                <div className="mt-2 text-sm text-gray-400">
                    Behavior Tags: {reputation.behaviorTags.join(", ")}
                </div>
            )}

            <h4 className="font-medium text-gray-200 mb-1">Metrics:</h4>
            <ul className="text-gray-400 text-sm list-disc list-inside">
                <li>Wallet Age (days): {metrics.walletAgeDays}</li>
                <li>Total Transactions: {metrics.totalTransactions}</li>
                <li>Unique Contracts Interacted With: {metrics.contractsInteracted}</li>
                <li>First Activity: {metrics.firstTxDate}</li>
                <li>Last Activity: {metrics.lastTxDate}</li>
            </ul>
        </Card>
    );
}
