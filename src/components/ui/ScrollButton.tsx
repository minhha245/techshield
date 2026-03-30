'use client';

interface ScrollButtonProps {
  targetId: string;
  label: string;
  className?: string;
}

export default function ScrollButton({ targetId, label, className }: ScrollButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
