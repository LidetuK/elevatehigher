
import { Star, Users } from 'lucide-react';
import { ReviewData } from './ReviewForm';

interface ReviewStatsProps {
  reviews: ReviewData[];
}

const ReviewStats = ({ reviews }: ReviewStatsProps) => {
  // If no reviews, return null
  if (reviews.length === 0) {
    return null;
  }

  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '0.0';

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 5 stars to 1 star
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });

  // Calculate percentages for the distribution bars
  const maxCount = Math.max(...ratingCounts);
  const percentages = ratingCounts.map(count => maxCount > 0 ? (count / maxCount) * 100 : 0);

  return (
    <div className="glassmorphism p-6 rounded-xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 flex flex-col items-center justify-center p-3">
          <div className="text-5xl font-bold text-book-secondary mb-2">{averageRating}</div>
          <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={20}
                className={
                  star <= Math.round(parseFloat(averageRating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-1" />
            <span>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center">
                <div className="min-w-[60px] flex items-center justify-end mr-2">
                  <span className="text-sm font-medium text-gray-600">{stars} star</span>
                </div>
                <div className="relative flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-400"
                    style={{ width: `${percentages[index]}%` }}
                  ></div>
                </div>
                <div className="min-w-[30px] text-right">
                  <span className="text-xs text-gray-500 ml-2">{ratingCounts[index]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
