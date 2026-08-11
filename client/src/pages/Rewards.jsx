import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Coins, Gift, TreePine, ShoppingBag, Percent, Banknote, Lock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } })
};

const categoryIcons = {
  cashback: Banknote,
  discount: Percent,
  donation: TreePine,
  voucher: Gift,
  merchandise: ShoppingBag,
};

export default function Rewards() {
  const { user, loadUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await axios.get('/api/rewards');
      setRewards(res.data.data);
    } catch {
      setRewards([
        { _id: '1', name: '₹50 Cashback', description: 'Get ₹50 cashback on your next pickup', icon: '💰', coinsRequired: 200, category: 'cashback' },
        { _id: '2', name: '10% Extra on Next Pickup', description: '10% bonus on scrap value', icon: '📈', coinsRequired: 150, category: 'discount' },
        { _id: '3', name: 'Plant a Tree', description: 'We plant a tree on your behalf', icon: '🌳', coinsRequired: 500, category: 'donation' },
        { _id: '4', name: '₹100 Amazon Voucher', description: 'Amazon gift card', icon: '🎁', coinsRequired: 800, category: 'voucher' },
        { _id: '5', name: 'Scrapify Eco Tote Bag', description: 'Exclusive reusable bag', icon: '👜', coinsRequired: 1000, category: 'merchandise' },
        { _id: '6', name: '₹200 Swiggy Voucher', description: 'Swiggy food delivery voucher', icon: '🍔', coinsRequired: 1500, category: 'voucher' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (reward) => {
    if (!user) {
      toast.error('Please login to redeem rewards');
      return;
    }
    if ((user?.greenCoins || 0) < reward.coinsRequired) {
      toast.error('Not enough Green Coins!');
      return;
    }
    setRedeeming(reward._id);
    try {
      await axios.post(`/api/rewards/${reward._id}/redeem`);
      toast.success(`🎉 Redeemed: ${reward.name}!`);
      loadUser();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Redemption failed');
    } finally {
      setRedeeming(null);
    }
  };

  const userCoins = user?.greenCoins || 0;

  return (
    <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-12">
          <div className="badge-green mx-auto w-fit mb-4">
            <Coins className="w-4 h-4" /> Green Coins Store
          </div>
          <h1 className="section-heading">Redeem Your Rewards</h1>
          <p className="section-subheading mx-auto mt-3">
            Turn your Green Coins into real rewards — cashback, vouchers, or plant a tree!
          </p>
          {user && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-gradient-to-r from-forest-700 to-forest-800 rounded-2xl text-white"
            >
              <Coins className="w-6 h-6 text-yellow-400" />
              <span className="font-display font-bold text-2xl">{userCoins}</span>
              <span className="text-forest-300 text-sm">Green Coins</span>
            </motion.div>
          )}
        </motion.div>

        {/* Rewards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, i) => {
            const canAfford = userCoins >= reward.coinsRequired;
            const Icon = categoryIcons[reward.category] || Gift;
            const progress = Math.min((userCoins / reward.coinsRequired) * 100, 100);

            return (
              <motion.div
                key={reward._id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className={`glass-card p-6 relative overflow-hidden transition-all duration-300 ${
                  canAfford ? 'hover:shadow-green hover:-translate-y-1' : 'opacity-80'
                }`}
              >
                {!canAfford && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-4 h-4 text-forest-400" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-forest-900">{reward.name}</h3>
                    <p className="text-forest-500 text-sm mt-0.5">{reward.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-forest-500">
                      {canAfford ? '✅ Enough coins!' : `${reward.coinsRequired - userCoins} more needed`}
                    </span>
                    <span className="font-mono font-semibold text-forest-700">{reward.coinsRequired} coins</span>
                  </div>
                  <div className="w-full bg-forest-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        canAfford ? 'bg-gradient-to-r from-forest-500 to-leaf' : 'bg-forest-300'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford || !user || redeeming === reward._id}
                  className={`w-full py-2.5 rounded-xl font-display font-semibold text-sm transition-all ${
                    canAfford
                      ? 'btn-primary'
                      : 'bg-forest-100 text-forest-400 cursor-not-allowed'
                  }`}
                >
                  {redeeming === reward._id ? 'Redeeming...' : canAfford ? 'Redeem Now' : 'Not Enough Coins'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* How to earn section */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 glass-card p-8">
          <h2 className="font-display font-bold text-xl text-forest-900 mb-6 text-center">How to Earn Green Coins</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎉', title: 'Sign Up', coins: '+50', desc: 'Welcome bonus' },
              { icon: '♻️', title: 'Every Pickup', coins: '+20', desc: 'Booking bonus' },
              { icon: '⚖️', title: 'Per Kg', coins: '+8-30', desc: 'Based on material' },
              { icon: '⭐', title: 'Rate Agent', coins: '+5', desc: 'Leave a review' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-display font-bold text-forest-900">{item.title}</p>
                <p className="font-mono font-bold text-leaf text-lg">{item.coins}</p>
                <p className="text-forest-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
