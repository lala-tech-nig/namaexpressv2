'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Page() {
  const [counts, setCounts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('pos_cart_v1');
    if (saved) setCounts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pos_cart_v1', JSON.stringify(counts));
  }, [counts]);

  const handleChange = (id, qty) => {
    setCounts((prev) => {
      const next = { ...prev };
      if (qty > 0) next[id] = qty;
      else delete next[id];
      return next;
    });
  };

  const clearAll = () => setCounts({});
  const totalItems = Object.values(counts).reduce((s, v) => s + v, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4">
        <h1 className="text-2xl font-bold tracking-wide">NAMA EXPRESS POS</h1>
      </header>

      {/* Product Grid */}
      <main className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            qty={counts[p.id] || 0}
            onChange={handleChange}
          />
        ))}
      </main>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: totalItems ? 1.1 : 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearAll}
          disabled={!totalItems}
          className={`font-bold ${
            totalItems
              ? 'text-red-500 hover:underline'
              : 'text-gray-500 cursor-not-allowed'
          }`}
        >
          Clear All
        </motion.button>

        <motion.button
          whileHover={{ scale: totalItems ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/checkout')}
          disabled={!totalItems}
          className={`px-6 py-2 rounded-xl font-bold transition ${
            totalItems
              ? 'bg-yellow-400 text-red-600 hover:shadow-lg'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Checkout {totalItems > 0 ? `(${totalItems})` : ''}
        </motion.button>
      </div>
    </div>
  );
}
