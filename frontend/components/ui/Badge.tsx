interface RiskBadgeProps {
    level: "low" | "medium" | "high";
}

export function RiskBadge({ level }: RiskBadgeProps) {
    let colorClasses = "";

    switch (level) {
        case "low":
            colorClasses = "bg-green-600 text-white";
            break;
        case "medium":
            colorClasses = "bg-yellow-500 text-black";
            break;
        case "high":
            colorClasses = "bg-red-600 text-white";
            break;
        default:
            colorClasses = "bg-gray-500 text-white";
    }

    return (
        <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${colorClasses}`}
        >
      {level.toUpperCase()}
    </span>
    );
}
