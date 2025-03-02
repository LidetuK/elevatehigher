
import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ReviewFormProps {
  onSubmitReview: (review: ReviewData) => void;
}

export interface ReviewData {
  id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

const ReviewForm = ({ onSubmitReview }: ReviewFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || rating === 0 || !title || !comment) {
      toast.error('Please fill in all the fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a unique ID using a timestamp and random number
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const newReview: ReviewData = {
      id,
      name,
      email,
      rating,
      title,
      comment,
      date: new Date().toLocaleDateString(),
      verified: true,
    };
    
    // Simulate network delay
    setTimeout(() => {
      onSubmitReview(newReview);
      
      // Reset form
      setName('');
      setEmail('');
      setRating(0);
      setTitle('');
      setComment('');
      
      setIsSubmitting(false);
      
      toast.success('Your review has been submitted!');
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glassmorphism rounded-xl p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-book-secondary">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-book-secondary mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-primary/50 transition-all duration-200"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-book-secondary mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-primary/50 transition-all duration-200"
              placeholder="Your email"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-book-secondary mb-1">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-all duration-200"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={24}
                  className={`transition-all duration-200 ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-book-secondary mb-1">
            Review Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-primary/50 transition-all duration-200"
            placeholder="Summarize your experience"
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-book-secondary mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-primary/50 transition-all duration-200"
            placeholder="Share your thoughts about the book"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-book-primary hover:bg-book-primary/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Send size={16} />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
