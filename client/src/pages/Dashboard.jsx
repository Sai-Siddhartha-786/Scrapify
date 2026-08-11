import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Coins, Scale, Wallet, Recycle, TreePine, Flame, Trophy,
  CalendarPlus, ChevronRight, Package, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } })
};

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  agent_assigned: 'bg-indigo-100 text-indigo-700',
  agent_en_route: 'bg-purple-100 text-purple-700',
  pickup_in_progress: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  agent_assigned: 'Agent Assigned',
  agent_en_route: 'On the Way',
  pickup_in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings?limit=5');
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const treesEquiv = ((user?.co2Saved || 0) / 21).toFixed(1);

  const statCards = [
    { label: 'Green Coins', value: user?.greenCoins || 0, icon: Coins, color: 'from-yellow-400 to-amber-500', iconBg: 'bg-amber-100' },
    { label: 'Total Earnings', value: `₹${user?.totalEarnings || 0}`, icon: Wallet, color: 'from-emerald-400 to-green-600', iconBg: 'bg-green-100' },
    { label: 'Scrap Recycled', value: `${user?.totalScrapKg || 0} kg`, icon: Scale, color: 'from-teal-400 to-cyan-600', iconBg: 'bg-teal-100' },
    { label: 'CO₂ Saved', value: `${(user?.co2Saved || 0).toFixed(1)} kg`, icon: TreePine, color: 'from-green-400 to-forest-600', iconBg: 'bg-forest-100' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl text-forest-900">
                Hey, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-forest-500 mt-1">Here's your recycling dashboard</p>
            </div>
            <Link to="/book" className="btn-primary flex items-center gap-2 w-fit">
              <CalendarPlus className="w-5 h-5" /> Book Pickup
            </Link>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="stat-card"
            >
              <div className={`w-11 h-11 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-forest-700" />
              </div>
              <p className="text-sm text-forest-500 font-medium">{stat.label}</p>
              <p className="font-display font-bold text-2xl text-forest-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-lg text-forest-900">Recent Pickups</h2>
                <Link to="/bookings" className="text-sm text-forest-600 hover:text-forest-800 font-medium flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-20 bg-forest-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-forest-300 mx-auto mb-3" />
                  <p className="text-forest-500 font-medium">No pickups yet</p>
                  <p className="text-forest-400 text-sm mt-1">Book your first scrap pickup to get started!</p>
                  <Link to="/book" className="btn-primary text-sm mt-4 inline-flex items-center gap-2">
                    <CalendarPlus className="w-4 h-4" /> Book Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="flex items-center gap-4 p-4 rounded-xl bg-forest-50/50 hover:bg-forest-50 transition-colors">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        booking.status === 'completed' ? 'bg-green-100' : 
                        booking.status === 'cancelled' ? 'bg-red-100' : 'bg-amber-100'
                      }`}>
                        {booking.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                         booking.status === 'cancelled' ? <XCircle className="w-5 h-5 text-red-600" /> :
                         <Clock className="w-5 h-5 text-amber-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-forest-800 text-sm truncate">
                          {booking.bookingId} — {booking.scrapItems?.map(i => i.categoryName).join(', ')}
                        </p>
                        <p className="text-forest-500 text-xs mt-0.5">
                          {new Date(booking.scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {booking.scheduledSlot}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>
                          {statusLabels[booking.status]}
                        </span>
                        {booking.totalAmount > 0 && (
                          <p className="text-forest-700 font-mono font-semibold text-sm mt-1">₹{booking.totalAmount}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="space-y-6">
            {/* Impact Card */}
            <div className="glass-card-dark p-6">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Recycle className="w-5 h-5 text-leaf" /> Your Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-forest-300">CO₂ Saved</span>
                    <span className="text-white font-mono">{(user?.co2Saved || 0).toFixed(1)} kg</span>
                  </div>
                  <div className="w-full bg-forest-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-leaf to-green-400 h-2 rounded-full transition-all" style={{ width: `${Math.min((user?.co2Saved || 0) / 50 * 100, 100)}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-forest-800/50 rounded-xl">
                  <span className="text-2xl">🌳</span>
                  <div>
                    <p className="text-forest-200 text-sm font-medium">Trees Equivalent</p>
                    <p className="text-white font-display font-bold text-lg">{treesEquiv}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-forest-800/50 rounded-xl">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="text-forest-200 text-sm font-medium">Total Pickups</p>
                    <p className="text-white font-display font-bold text-lg">{user?.totalPickups || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak & Badges */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Streak & Badges
              </h3>
              <div className="flex items-center gap-4 mb-4 p-3 bg-orange-50 rounded-xl">
                <div className="text-3xl">🔥</div>
                <div>
                  <p className="font-display font-bold text-lg text-forest-900">{user?.streak?.current || 0} months</p>
                  <p className="text-forest-500 text-xs">Longest: {user?.streak?.longest || 0} months</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(user?.badges || [{ name: 'Eco Newcomer', icon: '🌱' }]).map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 rounded-full text-sm">
                    <span>{badge.icon}</span>
                    <span className="text-forest-700 font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Card */}
            <div className="glass-card p-6 bg-gradient-to-br from-forest-50 to-leaf-light/20">
              <h3 className="font-display font-semibold text-forest-900 mb-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-forest-600" /> Refer & Earn
              </h3>
              <p className="text-forest-500 text-sm mb-4">Share your code and you both get 100 Green Coins!</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white border-2 border-dashed border-forest-300 rounded-xl px-4 py-2.5 text-center">
                  <p className="font-mono font-bold text-lg text-forest-800 tracking-wider">{user?.referralCode || '...'}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user?.referralCode || '');
                    import('react-hot-toast').then(m => m.default.success('Copied!'));
                  }}
                  className="btn-primary px-4 py-2.5 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
