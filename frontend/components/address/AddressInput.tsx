interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function AddressInput({ value, onChange }: Props) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-md border border-gray-700 px-4 py-2 text-sm"
        />
    );
}
