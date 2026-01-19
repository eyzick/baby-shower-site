import { motion } from 'framer-motion';

interface NavigationDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function NavigationDots({ total, current, onSelect }: NavigationDotsProps) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50 safe-bottom"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          className={`nav-dot ${index === current ? 'active' : ''}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? 'true' : 'false'}
        />
      ))}
    </motion.div>
  );
}

