import { motion } from 'framer-motion';
import SlideWrapper, { itemVariants } from './SlideWrapper';
import { BabyShowerData } from '../types';

interface WhereSlideProps {
  data: BabyShowerData;
  onNext: () => void;
  onPrev: () => void;
}

export default function WhereSlide({ data, onNext }: WhereSlideProps) {
  return (
    <SlideWrapper className="text-center">
      {/* Question */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <motion.span
          className="text-5xl md:text-6xl inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📍
        </motion.span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-handwritten text-3xl md:text-4xl text-sage-600 mb-4"
      >
        Where is it?
      </motion.h2>

      {/* Location card */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 md:p-10 max-w-lg mx-auto mb-8"
      >
        {/* Venue name */}
        <motion.h3
          className="font-display text-2xl md:text-3xl text-slate-800 mb-4"
        >
          {data.venue}
        </motion.h3>

        {/* Address */}
        <motion.p
          className="text-slate-600 text-lg mb-6 leading-relaxed"
        >
          {data.address}
        </motion.p>

        {/* Map link */}
        <motion.a
          href={data.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-sage-100 hover:bg-sage-200 text-sage-700 px-6 py-3 rounded-full font-medium transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Open in Maps
        </motion.a>

        {/* Theme info */}
        {data.theme && (
          <motion.div
            className="mt-6 pt-6 border-t border-sage-200"
          >
            <p className="text-sm text-slate-500 mb-1">Theme</p>
            <p className="font-semibold text-sage-600 flex items-center justify-center gap-2">
              <span>🌿</span>
              {data.theme}
              <span>🌸</span>
            </p>
          </motion.div>
        )}

        {/* Dress code */}
        {data.dresscode && (
          <motion.div className="mt-4">
            <p className="text-sm text-slate-500 mb-1">Dress Code</p>
            <p className="text-slate-700">{data.dresscode}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Special notes */}
      {data.specialNotes && (
        <motion.div
          variants={itemVariants}
          className="bg-cream-100/60 backdrop-blur rounded-2xl px-6 py-4 max-w-md mx-auto mb-8"
        >
          <p className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-lg">💡</span>
            {data.specialNotes}
          </p>
        </motion.div>
      )}

      {/* Next button */}
      <motion.button
        variants={itemVariants}
        onClick={onNext}
        className="btn-primary group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          What should I bring?
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

