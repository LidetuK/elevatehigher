
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Reviews from '@/components/Reviews';
import { ReviewData } from '@/components/ReviewForm';
import { toast } from 'sonner';
import { Lock, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(() => {
    // Try to load reviews from localStorage
    const savedReviews = localStorage.getItem('bookReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('bookReviews', JSON.stringify(reviews));
    }
  }, [reviews, isAuthenticated]);
  
  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
      toast.success('Review deleted successfully');
    }
  };
  
  const handleClearAllReviews = () => {
    if (window.confirm('Are you sure you want to delete all reviews? This action cannot be undone.')) {
      setReviews([]);
      toast.success('All reviews have been deleted');
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - in a real application, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <section className="pt-28 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-book-primary/10 text-book-primary rounded-full text-sm font-medium mb-4">
              Admin Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-book-secondary">
              Manage Book Reviews
            </h1>
          </div>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto glassmorphism p-8 rounded-xl animate-scale-in">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-book-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-book-primary" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-center mb-6">
                Admin Authentication
              </h2>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-book-secondary mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-primary/50 transition-all duration-200"
                    placeholder="Enter admin password"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hint: Use "admin123" for this demo</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-book-primary hover:bg-book-primary/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                >
                  Login
                </Button>
              </form>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleClearAllReviews}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear All Reviews
                </Button>
              </div>
              
              <div className="glassmorphism p-8 rounded-xl">
                <Reviews 
                  reviews={reviews} 
                  isAdmin={true} 
                  onDeleteReview={handleDeleteReview} 
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
