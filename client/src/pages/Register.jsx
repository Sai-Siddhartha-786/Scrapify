import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User, Phone, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', referralCode: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Welcome to Scrapify! 🌱 You earned 50 Green Coins!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-forest-50 to-white">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 relative items-center justify-center overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-leaf-pattern opacity-5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-leaf/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="relative z-10 max-w-md px-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-green-lg"
          >
            <Leaf className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-display font-bold text-3xl text-white mb-4 text-center">Join the Green Revolution</h2>
          <p className="text-forest-300 text-center leading-relaxed mb-8">
            Start earning from your household scrap today. It takes less than a minute.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🎁', text: '50 Green Coins welcome bonus' },
              { icon: '💰', text: 'Best rates, paid instantly' },
              { icon: '🌳', text: 'Track your environmental impact' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 px-4 py-3 bg-forest-800/50 rounded-xl backdrop-blur-sm">
                <span className="text-xl">{item.icon}</span>
                <span className="text-forest-200 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-forest-900">Scrapify</span>
          </div>

          <h1 className="font-display font-bold text-3xl text-forest-900 mb-2">Create account</h1>
          <p className="text-forest-500 mb-8">Start your recycling journey today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input type="text" value={form.name} onChange={update('name')} className="input-field pl-11" placeholder="Vibhu" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input type="email" value={form.email} onChange={update('email')} className="input-field pl-11" placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input type="tel" value={form.phone} onChange={update('phone')} className="input-field pl-11" placeholder="9876543210" maxLength={10} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  className="input-field pl-11 pr-11"
                  placeholder="Min 6 characters"
                  minLength={6}
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">
                Referral Code <span className="text-forest-400">(optional)</span>
              </label>
              <div className="relative">
                <Gift className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input type="text" value={form.referralCode} onChange={update('referralCode')} className="input-field pl-11" placeholder="Got a code? Enter it!" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Leaf className="w-5 h-5" /> Create Account <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-forest-500">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-700 font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
