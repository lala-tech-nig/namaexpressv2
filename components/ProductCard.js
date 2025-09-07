'use client';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCard({ product, qty, onChange }) {
  const holdTimer = useRef(null);

  const handleClick = () => {
    onChange(product.id, (qty || 0) + 1);
  };

  const handleHold = () => {
    onChange(product.id, 0); // reset
  };

  const startHold = () => {
    holdTimer.current = setTimeout(handleHold, 800);
  };

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        handleHold();
      }}
      onMouseDown={startHold}
      onMouseUp={clearHold}
      onMouseLeave={clearHold}
      onTouchStart={startHold}
      onTouchEnd={clearHold}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-lg font-bold">{product.name}</div>
        <div className="text-yellow-400 font-semibold">
          ₦{product.price.toLocaleString()}
        </div>
      </div>

      {/* Counter bubble with animation */}
      <AnimatePresence>
        {qty > 0 && (
          <motion.div
            key="counter"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="absolute top-2 right-2 bg-yellow-400 text-red-600 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow"
          >
            {qty}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
