import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper, { itemVariants } from './SlideWrapper';
import { BabyShowerData } from '../types';

interface RsvpSlideProps {
  data: BabyShowerData;
  onNext: () => void;
  onPrev: () => void;
}

export default function RsvpSlide({ data, onNext }: RsvpSlideProps) {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);

  const handleTextClick = () => {
    const guestText = guestCount === 1 ? '1 person' : `${guestCount} people`;
    const message = encodeURIComponent(
      `Hi ${data.hostName}! I'd love to attend ${data.parentNames}'s baby shower on ${data.date}!\n\nName: ${name || '[Your Name]'}\nNumber of guests: ${guestText}`
    );
    window.location.href = `sms:${data.hostPhone.replace(/[^0-9+]/g, '')}?body=${message}`;
  };

  const handleCallClick = () => {
    window.location.href = `tel:${data.hostPhone.replace(/[^0-9+]/g, '')}`;
  };

  const incrementGuests = () => setGuestCount(prev => Math.min(prev + 1, 10));
  const decrementGuests = () => setGuestCount(prev => Math.max(prev - 1, 1));

  return (
    <SlideWrapper className="text-center">
      {/* Question */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <motion.span
          className="text-5xl md:text-6xl inline-block"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          📱
        </motion.span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-handwritten text-3xl md:text-4xl text-sage-600 mb-4"
      >
        Let us know you're coming!
      </motion.h2>

      {/* RSVP Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 md:p-10 max-w-md mx-auto mb-8"
      >
        {/* Host info */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">Hosted by</p>
          <p className="font-display text-xl text-slate-800">{data.hostName}</p>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2 text-left">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none transition-colors bg-white/80 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Guest count */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2 text-left">Number of Guests</label>
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={decrementGuests}
              className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 font-bold text-2xl flex items-center justify-center border-2 border-sky-200 hover:bg-sky-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={guestCount <= 1}
            >
              −
            </motion.button>
            <div className="w-16 text-center">
              <span className="text-3xl font-bold text-sky-600">{guestCount}</span>
            </div>
            <motion.button
              onClick={incrementGuests}
              className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 font-bold text-2xl flex items-center justify-center border-2 border-sky-200 hover:bg-sky-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={guestCount >= 10}
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Text button */}
        <motion.button
          onClick={handleTextClick}
          className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mb-3"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Send RSVP Text
        </motion.button>

        {/* Call button */}
        <motion.button
          onClick={handleCallClick}
          className="w-full bg-white border-2 border-sky-300 text-sky-600 font-semibold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg hover:bg-sky-50 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call to RSVP
        </motion.button>

        {/* Phone number display */}
        <p className="text-sm text-slate-500 mb-2">or reach out directly:</p>
        <a
          href={`tel:${data.hostPhone.replace(/[^0-9+]/g, '')}`}
          className="text-sky-600 hover:text-sky-700 font-semibold text-lg underline decoration-sky-300 underline-offset-2"
        >
          {data.hostPhone}
        </a>

        {/* Deadline reminder */}
        <motion.div
          className="mt-6 pt-6 border-t border-sky-200 bg-sky-50/50 -mx-6 md:-mx-10 -mb-6 md:-mb-10 px-6 md:px-10 py-4 rounded-b-3xl"
        >
          <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
            <span>⏰</span>
            <span>
              Please RSVP by <strong className="text-sky-600">{data.rsvpDeadline}</strong>
            </span>
          </p>
        </motion.div>
      </motion.div>

      {/* Fun message */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <p className="text-slate-600 text-lg">
          Can't wait to see you there! 
          <motion.span
            className="inline-block ml-2"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
          >
            👋
          </motion.span>
        </p>
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
          View All Details
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
