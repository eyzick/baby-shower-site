import { motion } from 'framer-motion';
import SlideWrapper, { itemVariants } from './SlideWrapper';
import { BabyShowerData } from '../types';

interface WelcomeSlideProps {
  data: BabyShowerData;
  onNext: () => void;
}

export default function WelcomeSlide({ data, onNext }: WelcomeSlideProps) {
  return (
    <SlideWrapper className="text-center">
      {/* Animated baby icon */}
      <motion.div
        variants={itemVariants}
        className="text-7xl md:text-8xl mb-6"
      >
        <motion.span
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="inline-block"
        >
          👶
        </motion.span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-4xl md:text-6xl lg:text-7xl text-sky-600 mb-4 leading-tight"
      >
        You're Invited!
      </motion.h1>

      {/* Subheading */}
      <motion.p
        variants={itemVariants}
        className="font-handwritten text-2xl md:text-3xl text-sage-600 mb-2"
      >
        to celebrate
      </motion.p>

      {/* Parent names */}
      <motion.h2
        variants={itemVariants}
        className="font-display text-3xl md:text-5xl text-slate-800 mb-6"
      >
        {data.parentNames}
      </motion.h2>

      {/* Event type badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg mb-8"
      >
        <span className="text-2xl">💙</span>
        <span className="font-body text-lg md:text-xl text-sky-600 font-semibold">
          Baby Shower
        </span>
        <span className="text-2xl">💙</span>
      </motion.div>

      {/* Gender reveal hint */}
      <motion.p
        variants={itemVariants}
        className="text-slate-600 mb-8 text-lg"
      >
        {data.babyGender === 'surprise' ? (
          <span className="flex items-center justify-center gap-2">
            <span>It's a</span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              ✨
            </motion.span>
            <span className="font-semibold text-sky-500">Surprise!</span>
            <motion.span
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              ✨
            </motion.span>
          </span>
        ) : (
          <span>
            It's a {data.babyGender === 'boy' ? '💙 Boy!' : '💗 Girl!'}
          </span>
        )}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        onClick={onNext}
        className="btn-primary text-lg group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          Let's Celebrate
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            →
          </motion.span>
        </span>
      </motion.button>

      {/* Decorative elements - hidden on mobile to avoid overlap with swipe hint */}
      <motion.div
        variants={itemVariants}
        className="mt-12 hidden md:flex justify-center gap-4 text-3xl opacity-60"
      >
        {['⭐', '🧸', '🍼', '🚀', '💙'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </SlideWrapper>
  );
}

