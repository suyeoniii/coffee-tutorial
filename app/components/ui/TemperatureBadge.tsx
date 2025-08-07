interface TemperatureBadgeProps {
  temperature: '따뜻' | '아이스';
}

export default function TemperatureBadge({ temperature }: TemperatureBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded text-xs ${
      temperature === '따뜻' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
    }`}>
      {temperature}
    </span>
  );
} 