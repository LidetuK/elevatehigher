
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  title: string;
  author: string;
  className?: string;
}

const BookCover = ({ title, author, className }: BookCoverProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    
    if (img && img.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div 
      className={cn(
        "relative w-full max-w-md transition-transform duration-500 ease-out transform hover:scale-[1.02] cursor-pointer",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      <div className="absolute inset-0 bg-book-primary/10 rounded-xl blur-xl animate-pulse-slow"></div>
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <img
          ref={imageRef}
          src="/lovable-uploads/b59aa14b-f3f8-48ab-8177-3ece7eb43712.png"
          alt={`${title} by ${author}`}
          className="w-full h-auto object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};

export default BookCover;
