interface StarRatingProps {
  rating: number; // 1-5
  label: string;
}

export default function StarRating({ rating, label }: StarRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium w-12">{label}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}