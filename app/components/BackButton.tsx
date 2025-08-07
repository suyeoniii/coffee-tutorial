interface BackButtonProps {
  onClick: () => void;
  label: string;
}

export default function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="text-sm text-gray-600 mb-4 hover:text-gray-800"
    >
      ← {label}
    </button>
  );
}