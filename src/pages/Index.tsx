import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookCover from '@/components/BookCover';
import ReviewForm from '@/components/ReviewForm';
import Reviews from '@/components/Reviews';
import ReviewStats from '@/components/ReviewStats';
import { ReviewData } from '@/components/ReviewForm';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(() => {
    const savedReviews = localStorage.getItem('bookReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('bookReviews', JSON.stringify(reviews));
  }, [reviews]);
  
  const handleSubmitReview = (newReview: ReviewData) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setShowReviewForm(false);
    
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToReviewForm = () => {
    setShowReviewForm(true);
    setTimeout(() => {
      const formSection = document.getElementById('review-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <section className="pt-28 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left animate-fade-in">
              <span className="inline-block px-3 py-1 bg-book-primary/10 text-book-primary rounded-full text-sm font-medium mb-6">
                Featured Book
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-book-secondary mb-6 leading-tight">
                "Sell Like Crazy"
                <span className="block text-book-primary mt-2">by Sabri Suby</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                The bestselling book that reveals the marketing secrets to generating countless leads, sales, and profits for your business.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={scrollToReviewForm}
                  className="px-8 py-3 bg-book-primary text-white font-medium rounded-full hover:bg-book-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Write a Review
                </button>
                <a
                  href="#reviews-section"
                  className="px-8 py-3 bg-white text-book-secondary border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-all duration-300"
                >
                  Read Reviews
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <BookCover 
                title="Sell Like Crazy" 
                author="Sabri Suby" 
                className="w-80 md:w-96"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <a
              href="#book-excerpt"
              className="flex flex-col items-center text-gray-400 hover:text-book-primary transition-colors duration-300"
            >
              <span className="text-sm mb-2">Scroll for more</span>
              <ArrowDown size={20} className="animate-float" />
            </a>
          </div>
        </div>
      </section>
      
      <section id="book-excerpt" className="py-20 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-book-primary/10 text-book-primary rounded-full text-sm font-medium mb-4">
              About the Book
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-book-secondary mb-4">
              What Makes This Book Special
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the proven system that has generated over 1.35 billion dollars in sales for businesses worldwide.
            </p>
          </div>
          
          <div className="glassmorphism p-8 rounded-xl mb-12 animate-scale-in">
            <p className="text-xl text-book-secondary font-medium italic mb-6 leading-relaxed">
              "Possibly the most controversial marketing and sales book for the general public ever written..."
            </p>
            
            <p className="text-gray-600 mb-6">
              If you haven't heard of Sabri Suby before - let's give you a little background information. In the past few years, he's gone from cold calling potential customers from his bedroom to founder of King Kong, Australia's fastest-growing digital marketing agency which now boasts a multi-million-dollar turnover.
            </p>
            
            <p className="text-gray-600">
              Sabri is not just an advisor to billion-dollar brands and thousands of SMEs but by applying the system he describes in 'Sell Like Crazy', he's generated over 1.33 billion dollars in sales for his agency and his clients.
            </p>
          </div>
        </div>
      </section>
      
      <section id="reviews-section" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-book-primary/10 text-book-primary rounded-full text-sm font-medium mb-4">
              Reader Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-book-secondary mb-4">
              What Readers Are Saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Honest reviews from readers who have applied the principles from "Sell Like Crazy" in their businesses.
            </p>
          </div>
          
          <div className="mb-10">
            <ReviewStats reviews={reviews} />
          </div>
          
          {showReviewForm && (
            <div id="review-form" className="mb-16">
              <ReviewForm onSubmitReview={handleSubmitReview} />
            </div>
          )}
          
          <div className="mb-8 text-center">
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-2.5 bg-book-primary text-white font-medium rounded-full hover:bg-book-primary/90 transition-all duration-300 shadow-md"
              >
                Write a Review
              </button>
            )}
          </div>
          
          <Reviews reviews={reviews} />
        </div>
      </section>
      
      <footer className="py-10 px-4 bg-book-secondary text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <div className="bg-orange-500 text-white inline-block px-10 py-4 text-2xl font-bold uppercase tracking-wider mx-auto rounded">
                REVIEW THE BOOK
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-6">
              HURRY! STOCK OF THIS BOOK AS OF MARCH 2ND IS LOW
            </h3>
            
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1 w-full max-w-md">
                {Array(24).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 flex-1 ${i < 23 ? 'bg-gray-600' : 'bg-green-500'}`}
                  />
                ))}
              </div>
            </div>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              Read More
            </button>
            
            <p className="text-gray-300 mt-6">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
