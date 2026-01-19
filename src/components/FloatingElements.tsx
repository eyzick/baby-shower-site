import { motion } from 'framer-motion';

const floatingItems = [
  { emoji: '🍼', size: 'text-3xl', top: '10%', left: '5%', delay: 0 },
  { emoji: '⭐', size: 'text-2xl', top: '20%', right: '10%', delay: 0.5 },
  { emoji: '🧸', size: 'text-4xl', bottom: '30%', left: '8%', delay: 1 },
  { emoji: '💙', size: 'text-2xl', top: '40%', right: '5%', delay: 1.5 },
  { emoji: '🚀', size: 'text-3xl', bottom: '20%', right: '12%', delay: 2 },
  { emoji: '🌟', size: 'text-2xl', top: '60%', left: '3%', delay: 0.3 },
  { emoji: '✨', size: 'text-xl', top: '15%', left: '80%', delay: 0.8 },
  { emoji: '🎈', size: 'text-3xl', bottom: '40%', right: '3%', delay: 1.2 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} opacity-40`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            y: [0, -15, 0, 10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: item.delay },
            scale: { duration: 0.5, delay: item.delay },
            y: {
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            },
            rotate: {
              duration: 8 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

