import { motion } from 'framer-motion';
import SlideWrapper, { itemVariants } from './SlideWrapper';
import { BabyShowerData } from '../types';

interface GiftsSlideProps {
  data: BabyShowerData;
  onNext: () => void;
  onPrev: () => void;
}

export default function GiftsSlide({ data, onNext }: GiftsSlideProps) {
  return (
    <SlideWrapper className="text-center">
      {/* Question */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <motion.span
          className="text-5xl md:text-6xl inline-block"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎁
        </motion.span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-handwritten text-3xl md:text-4xl text-sage-600 mb-4"
      >
        What should I bring?
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-slate-600 mb-8 max-w-md mx-auto"
      >
        Your presence is the greatest gift! But if you'd like to bring something...
      </motion.p>

      {/* Registry links */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 md:p-8 max-w-lg mx-auto mb-6"
      >
        <h3 className="font-display text-xl text-slate-800 mb-4 flex items-center justify-center gap-2">
          <span>📝</span>
          Gift Registries
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {data.registryLinks.map((registry, index) => (
            <motion.a
              key={index}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span>{registry.store}</span>
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Gift suggestions */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 md:p-8 max-w-lg mx-auto mb-8"
      >
        <h3 className="font-display text-xl text-slate-800 mb-4 flex items-center justify-center gap-2">
          <span>🎟️</span>
          Diaper Raffle
        </h3>
        <ul className="space-y-4 text-left">
          {data.giftSuggestions.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-slate-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.span
                className="text-sky-400 text-lg flex-shrink-0 mt-0.5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                ★
              </motion.span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Next button */}
      <motion.button
        variants={itemVariants}
        onClick={onNext}
        className="btn-primary group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          How do I RSVP?
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </SlideWrapper>
  );
}

