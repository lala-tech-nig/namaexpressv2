// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import products from '../data/products';

// export default function Page() {
//   const [counts, setCounts] = useState({});
//   const router = useRouter();

//   // Load saved cart
//   useEffect(() => {
//     const saved = localStorage.getItem('pos_cart_v1');
//     if (saved) setCounts(JSON.parse(saved));
//   }, []);

//   // Persist cart
//   useEffect(() => {
//     localStorage.setItem('pos_cart_v1', JSON.stringify(counts));
//   }, [counts]);

//   // Handle product clicks
//   const handleClick = (id) => {
//     setCounts((prev) => {
//       const next = { ...prev, [id]: (prev[id] || 0) + 1 };
//       return next;
//     });
//   };

//   // Long press reset
//   const handleHold = (id) => {
//     setCounts((prev) => {
//       const next = { ...prev };
//       delete next[id];
//       return next;
//     });
//   };

//   const clearAll = () => setCounts({});
//   const totalItems = Object.values(counts).reduce((s, v) => s + v, 0);

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       {/* Header */}
//       <header className="p-4 flex items-center justify-center space-x-3">
//   <img 
//     src="/landinglogo.jpeg" 
//     alt="NAMA EXPRESS POS Logo" 
//     className="w-15 h-15 object-contain" 
//   />
//   <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow">
//     NAMA EXPRESS POS
//   </h1>
// </header>


//       {/* Product Grid */}
//       <main className="flex-1 p-4 py-20 grid grid-cols-2 md:grid-cols-4 gap-4">
//         {products.map((p) => (
//           <motion.div
//             key={p.id}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => handleClick(p.id)}
//             onContextMenu={(e) => {
//               e.preventDefault();
//               handleHold(p.id);
//             }}
//             className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
//             style={{
//               backgroundImage: `url(${p.img})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

//             {/* Text */}
//             <div className="absolute bottom-2 left-2">
//               <div className="font-bold text-lg">{p.name}</div>
//               <div className="text-yellow-300 font-semibold">₦{p.price}</div>
//             </div>

//             {/* Counter Badge */}
//             {counts[p.id] > 0 && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow"
//               >
//                 {counts[p.id]}
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </main>

//       {/* Footer Action Bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md p-4 flex justify-between items-center border-t border-gray-700">
//         <motion.button
//           whileHover={{ scale: totalItems ? 1.1 : 1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={clearAll}
//           disabled={!totalItems}
//           className={`font-bold ${
//             totalItems
//               ? 'text-red-500 hover:underline'
//               : 'text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           Clear All
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: totalItems ? 1.05 : 1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => router.push('/checkout')}
//           disabled={!totalItems}
//           className={`px-6 py-2 rounded-xl font-bold shadow-lg transition ${
//             totalItems
//               ? 'bg-yellow-400 text-red-600 hover:shadow-yellow-500/50'
//               : 'bg-gray-500 text-gray-300 cursor-not-allowed'
//           }`}
//         >
//           Checkout {totalItems > 0 ? `(${totalItems})` : ''}
//         </motion.button>
//       </div>
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import products from '../data/products';

export default function Page() {
  const [counts, setCounts] = useState({});
  const router = useRouter();

  // Load saved cart
  useEffect(() => {
    const saved = localStorage.getItem('pos_cart_v1');
    if (saved) setCounts(JSON.parse(saved));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('pos_cart_v1', JSON.stringify(counts));
  }, [counts]);

  const handleClick = (id) => {
    setCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      return next;
    });
  };

  const handleHold = (id) => {
    setCounts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearAll = () => setCounts({});
  const totalItems = Object.values(counts).reduce((s, v) => s + v, 0);

  // Split products into categories
  const launchMenu = products.filter((p) => {
    const num = parseInt(p.id.replace('p', ''), 10);
    return num >= 1 && num <= 12;
  });

  const mainMenu = products.filter((p) => {
    const num = parseInt(p.id.replace('p', ''), 10);
    return num > 12;
  });

  const renderProduct = (p) => (
    <motion.div
      key={p.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleClick(p.id)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleHold(p.id);
      }}
      className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
      style={{
        backgroundImage: `url(${p.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

      {/* Text */}
      <div className="absolute bottom-2 left-2">
        <div className="font-bold text-lg">{p.name}</div>
        <div className="text-yellow-300 font-semibold">₦{p.price}</div>
      </div>

      {/* Counter Badge */}
      {counts[p.id] > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow"
        >
          {counts[p.id]}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-center space-x-3">
        <img
          src="/landinglogo.jpeg"
          alt="NAMA EXPRESS POS Logo"
          className="w-15 h-15 object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow">
          NAMA EXPRESS POS
        </h1>
      </header>

      {/* Product Sections */}
      <main className="flex-1 p-4 py-20 space-y-20">
        {/* Launch Menu */}
        <section>
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-10 text-center drop-shadow-lg">
            LUNCH MENU
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {launchMenu.map(renderProduct)}
          </div>
        </section>

        {/* Main Menu */}
        <section>
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-10 text-center drop-shadow-lg">
            MAIN MENU
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mainMenu.map(renderProduct)}
          </div>
        </section>
      </main>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md p-4 flex justify-between items-center border-t border-gray-700">
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
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition ${
            totalItems
              ? 'bg-yellow-400 text-red-600 hover:shadow-yellow-500/50'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Checkout {totalItems > 0 ? `(${totalItems})` : ''}
        </motion.button>
      </div>
    </div>
  );
}
