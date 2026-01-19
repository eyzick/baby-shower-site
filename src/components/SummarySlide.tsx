import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { BabyShowerData } from '../types';

interface SummarySlideProps {
  data: BabyShowerData;
  goToSlide: (index: number) => void;
}

export default function SummarySlide({ data, goToSlide }: SummarySlideProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleExportImage = async () => {
    if (!summaryRef.current || isExporting) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(summaryRef.current, {
        backgroundColor: '#f4f9fb',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `baby-shower-${data.parentNames.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddToCalendar = () => {
    const eventTitle = `${data.parentNames}'s Baby Shower`;
    const eventDetails = `Join us to celebrate ${data.parentNames}!\n\nVenue: ${data.venue}\nAddress: ${data.address}`;
    
    // Create Google Calendar URL
    const startDate = '20260328T140000';
    const endDate = '20260328T170000';
    const googleCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(data.address)}`;
    
    window.open(googleCalUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="slide pt-8 pb-24 px-4 pattern-grid">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#66b1ca', '#788c61', '#4296b4', '#9bcdde', '#337997'][Math.floor(Math.random() * 5)],
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
              initial={{ y: -20, rotate: 0, opacity: 1 }}
              animate={{ y: '100vh', rotate: 720, opacity: 0 }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5 }}
            />
          ))}
        </div>
      )}

      <motion.div
        ref={summaryRef}
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <span className="text-5xl mb-4 block">👶💙</span>
          <h1 className="font-display text-3xl md:text-4xl text-sky-600 mb-2">
            {data.parentNames}'s Baby Shower
          </h1>
          <p className="font-handwritten text-xl text-sage-600">
            All the details you need
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid gap-4 mb-8">
          {/* When */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => goToSlide(1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">📅</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">When</h3>
                <p className="text-slate-700">{data.date}</p>
                <p className="text-slate-600 text-sm">{data.time}</p>
              </div>
            </div>
          </motion.div>

          {/* Where */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => goToSlide(2)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">📍</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">Where</h3>
                <p className="text-slate-700">{data.venue}</p>
                <p className="text-slate-600 text-sm">{data.address}</p>
              </div>
            </div>
          </motion.div>

          {/* Gifts */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => goToSlide(3)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎁</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">Gift Registries</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.registryLinks.map((registry, i) => (
                    <a
                      key={i}
                      href={registry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-sage-100 text-sage-700 px-3 py-1 rounded-full hover:bg-sage-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {registry.store}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RSVP */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => goToSlide(4)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">📱</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">RSVP</h3>
                <p className="text-slate-700">Contact: {data.hostName}</p>
                <p className="text-slate-600 text-sm">{data.hostPhone}</p>
                <p className="text-sky-600 text-sm mt-1">
                  Please respond by {data.rsvpDeadline}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          {(data.theme || data.dresscode) && (
            <motion.div
              variants={itemVariants}
              className="glass-card p-5"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">✨</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">Good to Know</h3>
                  {data.theme && (
                    <p className="text-slate-600 text-sm">🌿 Theme: {data.theme}</p>
                  )}
                  {data.dresscode && (
                    <p className="text-slate-600 text-sm">👗 {data.dresscode}</p>
                  )}
                  {data.specialNotes && (
                    <p className="text-slate-600 text-sm mt-2">💡 {data.specialNotes}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mt-6 safe-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={handleAddToCalendar}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add to Calendar
        </motion.button>

        <motion.button
          onClick={handleExportImage}
          disabled={isExporting}
          className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          whileHover={{ scale: isExporting ? 1 : 1.02 }}
          whileTap={{ scale: isExporting ? 1 : 0.98 }}
        >
          {isExporting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                ⏳
              </motion.span>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save as Image
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Back to start */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() => goToSlide(0)}
          className="text-sage-600 hover:text-sage-700 text-sm font-medium underline decoration-sage-300 underline-offset-2"
        >
          ← Back to beginning
        </button>
      </motion.div>
    </div>
  );
}

