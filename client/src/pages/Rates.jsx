import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Calculator, ArrowRight, Coins, TrendingUp, RefreshCw } from 'lucide-react';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } })
};

export default function Rates() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calcItems, setCalcItems] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/scrap-categories');
      setCategories(res.data.data);
    } catch {
      // Use fallback data
      setCategories([
        { _id: '1', name: 'Newspaper', icon: '📰', ratePerKg: 14, greenCoinsPerKg: 12, co2PerKg: 0.9 },
        { _id: '2', name: 'Cardboard', icon: '📦', ratePerKg: 8, greenCoinsPerKg: 10, co2PerKg: 0.7 },
        { _id: '3', name: 'Plastic', icon: '🧴', ratePerKg: 10, greenCoinsPerKg: 15, co2PerKg: 1.5 },
        { _id: '4', name: 'Iron / Steel', icon: '🔩', ratePerKg: 28, greenCoinsPerKg: 20, co2PerKg: 1.8 },
        { _id: '5', name: 'Copper', icon: '🔌', ratePerKg: 420, greenCoinsPerKg: 30, co2PerKg: 3.0 },
        { _id: '6', name: 'Aluminium', icon: '🥫', ratePerKg: 105, greenCoinsPerKg: 25, co2PerKg: 2.5 },
        { _id: '7', name: 'E-Waste', icon: '💻', ratePerKg: 35, greenCoinsPerKg: 25, co2PerKg: 2.0 },
        { _id: '8', name: 'Glass', icon: '🍾', ratePerKg: 3, greenCoinsPerKg: 8, co2PerKg: 0.3 },
        { _id: '9', name: 'Books / Copies', icon: '📚', ratePerKg: 12, greenCoinsPerKg: 12, co2PerKg: 0.8 },
        { _id: '10', name: 'Mixed Scrap', icon: '🗑️', ratePerKg: 6, greenCoinsPerKg: 8, co2PerKg: 0.4 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = Object.entries(calcItems).reduce((sum, [id, kg]) => {
    const cat = categories.find(c => c._id === id);
    return sum + (cat ? cat.ratePerKg * kg : 0);
  }, 0);

  const totalCoins = Object.entries(calcItems).reduce((sum, [id, kg]) => {
    const cat = categories.find(c => c._id === id);
    return sum + (cat ? cat.greenCoinsPerKg * kg : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-12">
          <div className="badge-green mx-auto w-fit mb-4">
            <TrendingUp className="w-4 h-4" /> Updated Daily
          </div>
          <h1 className="section-heading">Scrap Rate Card</h1>
          <p className="section-subheading mx-auto mt-3">
            Transparent pricing. What you see is what you get — no hidden deductions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rate Cards */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="glass-card p-5 hover:shadow-green transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center text-2xl">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-forest-900">{cat.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-forest-500">🌿 {cat.co2PerKg} kg CO₂/kg</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-xl text-forest-800">₹{cat.ratePerKg}</p>
                      <p className="text-xs text-forest-500">per kg</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-forest-100 flex justify-between text-xs text-forest-500">
                    <span className="flex items-center gap-1"><Coins className="w-3 h-3" /> {cat.greenCoinsPerKg} coins/kg</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <div className="glass-card p-6 sticky top-24">
              <h3 className="font-display font-bold text-lg text-forest-900 mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-forest-600" /> Scrap Calculator
              </h3>
              <p className="text-forest-500 text-sm mb-5">Estimate how much you can earn</p>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {categories.map(cat => (
                  <div key={cat._id} className="flex items-center gap-3">
                    <span className="text-lg w-8 text-center">{cat.icon}</span>
                    <span className="flex-1 text-sm text-forest-700 truncate">{cat.name}</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={calcItems[cat._id] || ''}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 0;
                          setCalcItems(prev => v > 0 ? { ...prev, [cat._id]: v } : (() => { const p = { ...prev }; delete p[cat._id]; return p; })());
                        }}
                        className="w-16 px-2 py-1.5 text-sm text-center border-2 border-forest-200 rounded-lg focus:border-forest-500 focus:outline-none font-mono"
                        placeholder="0"
                      />
                      <span className="text-xs text-forest-400">kg</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-forest-200 space-y-3">
                <div className="flex justify-between">
                  <span className="text-forest-600 font-medium">Estimated Value</span>
                  <span className="font-mono font-bold text-xl text-forest-900">₹{totalValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-600 text-sm">Green Coins</span>
                  <span className="font-mono font-semibold text-forest-700 flex items-center gap-1">
                    <Coins className="w-4 h-4 text-amber-500" /> {totalCoins}
                  </span>
                </div>

                {totalValue > 0 && (
                  <Link to="/book" className="block btn-primary text-center text-sm mt-4">
                    Book Pickup — Earn ₹{totalValue} <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                )}

                {Object.keys(calcItems).length > 0 && (
                  <button onClick={() => setCalcItems({})} className="w-full btn-ghost text-sm flex items-center justify-center gap-2 text-forest-500">
                    <RefreshCw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
