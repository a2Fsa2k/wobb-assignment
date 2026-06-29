interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-blue-500 text-white rounded-full text-[10px] font-bold"
      title="Verified"
      aria-label="Verified account"
    >
      ✓
    </span>
  );
}
