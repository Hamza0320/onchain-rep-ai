/**
 * Simple container with consistent styling
 */
export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            {children}
        </div>
    );
}
