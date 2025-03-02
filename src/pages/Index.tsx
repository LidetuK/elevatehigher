
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookCover from '@/components/BookCover';
import ReviewForm from '@/components/ReviewForm';
import Reviews from '@/components/Reviews';
import ReviewStats from '@/components/ReviewStats';
import { ReviewData } from '@/components/ReviewForm';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(() => {
    const savedReviews = localStorage.getItem('bookReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  
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
                "Elevate Higher"
                <span className="block text-book-primary mt-2">by Resk'Que</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              The bestselling book that unveils the secrets to unlocking limitless growth, success, and breakthroughs in every area of your life.
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
                title="Elevate Higher" 
                author="Resk'Que" 
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
            Uncover the powerful strategies that have helped countless individuals break barriers, achieve success, and transform their lives.
            </p>
          </div>
          
          <div className="glassmorphism p-8 rounded-xl mb-12 animate-scale-in">
            <p className="text-xl text-book-secondary font-medium italic mb-6 leading-relaxed">
            "Possibly the most eye-opening and transformative personal growth book ever written..."
            </p>
            
            <p className="text-gray-600 mb-6">
            If you haven't heard of Resk'que before, here's what you need to know—through years of experience and a relentless pursuit of excellence, Resk'que has developed a proven system to help individuals elevate their mindset, overcome limitations, and unlock their highest potential.
            </p>
            
            <p className="text-gray-600">
            By applying the principles outlined in Elevate Higher, countless readers have reshaped their futures, achieving remarkable success in their personal and professional lives. Now, it's your turn to rise above and reach new heights.
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
            Genuine testimonials from readers who have implemented the principles of Elevate Higher to transform their mindset, achieve personal breakthroughs, and unlock new levels of success.
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
      
      <footer className="py-10 px-4 bg-white text-book-secondary border-t border-gray-100">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
            <div
  onClick={scrollToReviewForm}  // The function to handle the click event
  className="bg-orange-500 text-white inline-block px-10 py-4 text-2xl font-bold uppercase tracking-wider mx-auto rounded cursor-pointer hover:bg-orange-400 transition-all duration-300"
>
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
            
            <button 
              onClick={() => setShowFullContent(!showFullContent)} 
              className="text-book-primary hover:text-book-primary/80 font-medium transition-colors"
            >
              {showFullContent ? 'Show Less' : 'Read More'}
            </button>
            
            {showFullContent && (
              <div className="mt-6 text-left max-w-4xl mx-auto py-6 px-6 border border-gray-100 rounded-lg shadow-sm bg-gray-50 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 text-book-secondary">Elevate Higher by Resk'que – A Game-Changer in Personal Growth and Success</h2>
                
                <p className="mb-4">
                  When you come across a book that challenges conventional wisdom and offers a fresh perspective on personal and professional growth, you know it's something worth reading. Elevate Higher by Resk'que is that book—a transformative guide designed to help individuals break through limitations and unlock their true potential.
                </p>
                
                <p className="mb-4">
                  This isn't just another self-help book filled with vague motivation. Elevate Higher delivers a powerful, actionable framework to help you rise above setbacks, develop a growth mindset, and take control of your destiny. It's a must-read for anyone ready to elevate their thinking, habits, and results.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-book-secondary">A Roadmap to Personal Mastery and Success</h3>
                
                <p className="mb-4">
                  If you've ever felt stuck in life—whether in your career, relationships, or personal development—Elevate Higher provides the clarity and strategies you need to push forward. Resk'que presents a structured approach to overcoming challenges, setting meaningful goals, and cultivating the mindset necessary for long-term success.
                </p>
                
                <p className="mb-4">
                  With chapters dedicated to resilience, discipline, and intentional action, this book serves as both a mentor and a playbook for personal transformation. Whether you're an entrepreneur, professional, or someone seeking positive change, the principles in Elevate Higher will guide you toward achieving your aspirations.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-book-secondary">Why You Need to Read Elevate Higher</h3>
                
                <p className="mb-4">
                  The book is packed with insights that resonate with anyone striving for excellence. Some key takeaways include:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>The Power of Perspective:</strong> Learn how shifting your mindset can change your reality.</li>
                  <li><strong>Overcoming Self-Doubt:</strong> Strategies to silence your inner critic and build unshakable confidence.</li>
                  <li><strong>Taking Decisive Action:</strong> Practical steps to move from planning to execution.</li>
                  <li><strong>Sustaining Growth:</strong> How to stay consistent and keep elevating, no matter the obstacles.</li>
                </ul>
                
                <p className="mb-4">
                  Resk'que doesn't just preach theory—every concept is backed by real-life applications and strategies that you can start using immediately.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-book-secondary">Rave Reviews for Elevate Higher</h3>
                
                <p className="mb-4">
                  Readers worldwide have praised Elevate Higher for its straightforward yet profound approach to self-improvement. Unlike books filled with fluff and generic advice, Resk'que provides clear, step-by-step methods to help you implement positive change in your life.
                </p>
                
                <p className="mb-4">
                  Many have described it as a "wake-up call" that pushes them to take action and stop settling for mediocrity. Whether you're looking to enhance your productivity, build better habits, or simply gain a new perspective on success, this book is an invaluable tool.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-book-secondary">A Must-Read for Anyone Serious About Growth</h3>
                
                <p className="mb-4">
                  If you're ready to step out of your comfort zone and start living with purpose, Elevate Higher is your guide. This book will challenge you to think bigger, act bolder, and achieve more than you ever thought possible.
                </p>
                
                <p className="font-medium">
                  So, are you ready to elevate your life? Grab your copy today and take the first step toward your highest potential!
                </p>
              </div>
            )}
            
            <p className="text-gray-500 mt-6">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
