'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import products from '../../data/products';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const [counts, setCounts] = useState({});
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('pos_cart_v1');
    if (saved) setCounts(JSON.parse(saved));
  }, []);

  const selected = products.filter(p => counts[p.id] > 0);
  const grandTotal = selected.reduce(
    (s, p) => s + p.price * (counts[p.id] || 0),
    0
  );

  const goBack = () => {
    router.push('/');
  };

  const confirmAndPrint = async () => {
    const order = {
      id: `ord_${Date.now()}`,
      createdAt: new Date(),
      items: selected.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        qty: counts[p.id],
      })),
      total: grandTotal,
    };

    try {
      setSending(true);

      const res = await fetch("https://namaexpressbackend.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to send");

      // show animated modal
      setShowModal(true);

      const receiptWindow = window.open("", "_blank", "width=600,height=800");
      receiptWindow.document.write(generateReceiptHtml(order));
      receiptWindow.document.close();

      setTimeout(() => {
        receiptWindow.print();
        localStorage.removeItem("pos_cart_v1");
        setShowModal(false);
        router.push("/");
      }, 2000);

    } catch (err) {
      console.error("Error:", err.message);
      alert("❌ Failed to send order: " + err.message);
    } finally {
      setSending(false);
    }
  };

  const generateReceiptHtml = (order) => {
    const itemsHtml = order.items.map(it => `
      <tr>
        <td>${it.name}</td>
        <td style="text-align:center">${it.qty}</td>
        <td style="text-align:right">₦${it.price.toLocaleString()}</td>
        <td style="text-align:right">₦${(it.price*it.qty).toLocaleString()}</td>
      </tr>
    `).join('');

    return `
      <html>
        <body style="font-family:Arial;padding:20px">
          <h2 style="text-align:center">LALA TECH CAFÉ</h2>
          <div>${new Date(order.createdAt).toLocaleString()}</div>
          <div>Order: ${order.id}</div>
          <table style="width:100%;margin-top:10px;border-collapse:collapse">
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <h3>Total: ₦${order.total.toLocaleString()}</h3>
          <p style="text-align:center">Thanks for patronizing us</p>
        </body>
      </html>
    `;
  };

  return (
    <div>
      <Header title="Checkout" />
      <main className="p-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-800">🛒 Order Summary</h2>

          {selected.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-slate-400 italic"
            >
              No items selected.
            </motion.div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {selected.map(p => (
                <li key={p.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-800">{p.name}</div>
                    <div className="text-sm text-slate-500">₦{p.price.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{counts[p.id]}x</div>
                    <div className="text-sm text-slate-600">₦{(p.price * counts[p.id]).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {selected.length > 0 && (
            <div className="mt-6 flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-xl">
              <div className="text-lg font-bold text-green-700">Total</div>
              <div className="text-2xl font-extrabold text-green-800">₦{grandTotal.toLocaleString()}</div>
            </div>
          )}

          <div className="mt-6 flex gap-4 justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={goBack}
              className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium shadow"
            >
              ← Back
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: selected.length === 0 || sending ? 1 : 1.05 }}
              onClick={confirmAndPrint}
              disabled={selected.length === 0 || sending}
              className={`${selected.length === 0 || sending
                  ? 'bg-slate-200 text-slate-400'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                } px-5 py-2 rounded-xl font-semibold transition`}
            >
              {sending ? 'Sending...' : 'Confirm & Print'}
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* ✅ Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-5xl mb-3"
              >
                ✅
              </motion.div>
              <h3 className="text-lg font-bold text-slate-800">Order Sent!</h3>
              <p className="text-slate-600 mt-1">Printing receipt...</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-1 bg-blue-600 mt-4 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
