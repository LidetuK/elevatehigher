
import { useState } from 'react';
import { Star, Trash2, ThumbsUp } from 'lucide-react';
import { ReviewData } from './ReviewForm';

interface ReviewCardProps {
  review: ReviewData;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const ReviewCard = ({ review, isAdmin = false, onDelete }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
  };
  
  const toggleHelpful = () => {
    setIsHelpful(!isHelpful);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  const avatarColors = [
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-yellow-200 text-yellow-800',
    'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800',
    'bg-indigo-200 text-indigo-800',
  ];
  
  // Use a hash of the name to consistently get the same color
  const getColorIndex = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % avatarColors.length);
  };
  
  const avatarColor = avatarColors[getColorIndex(review.name)];

  return (
    <div className="glassmorphism p-5 rounded-xl animate-scale-in">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${avatarColor} flex-shrink-0`}>
          {getInitials(review.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-book-secondary font-medium">{review.name}</h4>
              <div className="flex items-center mt-1 text-sm text-book-muted">
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </span>
                <span className="mx-2">•</span>
                <span>{review.date}</span>
                {review.verified && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-green-600 font-medium">Verified</span>
                  </>
                )}
              </div>
            </div>
            
            {isAdmin && (
              <button 
                onClick={handleDelete}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete review"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
          <h3 className="text-book-secondary font-semibold mt-2">{review.title}</h3>
          
          <div className="mt-1 text-book-secondary/85 text-sm leading-relaxed">
            {isExpanded ? review.comment : truncateText(review.comment, 200)}
            {review.comment.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-book-primary font-medium text-sm hover:underline focus:outline-none"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          
          <div className="mt-3 flex items-center">
            <button
              onClick={toggleHelpful}
              className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full transition-colors ${
                isHelpful ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <ThumbsUp size={12} className={isHelpful ? 'fill-green-600' : ''} />
              <span>{isHelpful ? 'Helpful' : 'Mark as helpful'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
