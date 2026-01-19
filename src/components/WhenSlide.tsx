import { motion } from 'framer-motion';
import SlideWrapper, { itemVariants } from './SlideWrapper';
import { BabyShowerData } from '../types';

interface WhenSlideProps {
  data: BabyShowerData;
  onNext: () => void;
  onPrev: () => void;
}

export default function WhenSlide({ data, onNext }: WhenSlideProps) {
  return (
    <SlideWrapper className="text-center">
      {/* Question */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <motion.span
          className="text-5xl md:text-6xl inline-block"
          animate={{ rotate: [0, -15, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          📅
        </motion.span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-handwritten text-3xl md:text-4xl text-sage-600 mb-4"
      >
        When is it?
      </motion.h2>

      {/* Date card */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-8 md:p-12 max-w-md mx-auto mb-8"
      >
        {/* Calendar visualization */}
        <div className="mb-6">
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="bg-sky-600/50 w-full py-1 text-xs uppercase tracking-wider">
              March
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="font-display text-4xl md:text-5xl font-bold">28</span>
            </div>
          </motion.div>
        </div>

        {/* Date text */}
        <motion.p
          className="font-display text-2xl md:text-3xl text-slate-800 mb-3"
        >
          {data.date}
        </motion.p>

        {/* Time */}
        <motion.div
          className="flex items-center justify-center gap-3 text-lg md:text-xl text-slate-600"
        >
          <span className="text-2xl">🕐</span>
          <span className="font-semibold">{data.time}</span>
        </motion.div>

        {/* RSVP deadline */}
        <motion.div
          className="mt-6 pt-6 border-t border-sky-200"
        >
          <p className="text-sm text-slate-500 mb-1">Please RSVP by</p>
          <p className="font-semibold text-sky-600">{data.rsvpDeadline}</p>
        </motion.div>
      </motion.div>

      {/* Add to calendar hint */}
      <motion.p
        variants={itemVariants}
        className="text-slate-500 text-sm mb-8"
      >
        Save the date! 💙
      </motion.p>

      {/* Next button */}
      <motion.button
        variants={itemVariants}
        onClick={onNext}
        className="btn-primary group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          Where is it?
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

