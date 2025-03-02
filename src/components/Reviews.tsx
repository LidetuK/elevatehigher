
import { useState } from 'react';
import { ReviewData } from './ReviewForm';
import ReviewCard from './ReviewCard';

interface ReviewsProps {
  reviews: ReviewData[];
  isAdmin?: boolean;
  onDeleteReview?: (id: string) => void;
}

const Reviews = ({ reviews, isAdmin = false, onDeleteReview }: ReviewsProps) => {
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  
  const getSortedReviews = () => {
    if (sortBy === 'date') {
      return [...reviews].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    }
  };
  
  const sortedReviews = getSortedReviews();

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg text-gray-500">No reviews yet. Be the first to share your thoughts!</h3>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold text-book-secondary">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
            className="border-0 bg-transparent text-sm font-medium text-book-secondary cursor-pointer focus:outline-none focus:ring-0"
          >
            <option value="date">Most Recent</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-5 reviews-container max-h-[800px] overflow-y-auto pr-2">
        {sortedReviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            isAdmin={isAdmin}
            onDelete={onDeleteReview}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
