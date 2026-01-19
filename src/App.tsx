import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { babyShowerData } from './data';
import { SlideType } from './types';
import WelcomeSlide from './components/WelcomeSlide';
import WhenSlide from './components/WhenSlide';
import WhereSlide from './components/WhereSlide';
import GiftsSlide from './components/GiftsSlide';
import RsvpSlide from './components/RsvpSlide';
import SummarySlide from './components/SummarySlide';
import FloatingElements from './components/FloatingElements';
import NavigationDots from './components/NavigationDots';

const slides: SlideType[] = ['welcome', 'when', 'where', 'gifts', 'rsvp', 'summary'];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  }),
};

function App() {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    const newDirection = index > currentSlide ? 1 : -1;
    setCurrentSlide([index, newDirection]);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const renderSlide = () => {
    const props = {
      data: babyShowerData,
      onNext: nextSlide,
      onPrev: prevSlide,
      isFirst: currentSlide === 0,
      isLast: currentSlide === slides.length - 1,
    };

    switch (slides[currentSlide]) {
      case 'welcome':
        return <WelcomeSlide {...props} />;
      case 'when':
        return <WhenSlide {...props} />;
      case 'where':
        return <WhereSlide {...props} />;
      case 'gifts':
        return <GiftsSlide {...props} />;
      case 'rsvp':
        return <RsvpSlide {...props} />;
      case 'summary':
        return <SummarySlide {...props} goToSlide={goToSlide} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden">
      {/* Background gradient based on slide */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: currentSlide === 5 
            ? 'linear-gradient(135deg, #f6f7f4 0%, #e8ebe3 50%, #d3d9c9 100%)'
            : 'linear-gradient(135deg, #f4f9fb 0%, #e6f2f7 50%, #c8e3ed 100%)'
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Pattern overlay */}
      <div className="fixed inset-0 pattern-dots opacity-50 pointer-events-none -z-5" />

      {/* Main content */}
      <AnimatePresence
        mode="wait"
        custom={direction}
        onExitComplete={() => setIsTransitioning(false)}
      >
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
            rotateY: { duration: 0.4 },
          }}
          className="w-full"
          style={{ perspective: 1000 }}
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <NavigationDots
        total={slides.length}
        current={currentSlide}
        onSelect={goToSlide}
      />

      {/* Swipe hint on first slide */}
      {currentSlide === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 text-sky-500 text-sm font-medium flex items-center gap-2"
        >
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Swipe or tap to continue →
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

export default App;

