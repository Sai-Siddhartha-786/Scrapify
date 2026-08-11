import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🌿');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-forest-50 to-white">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 relative items-center justify-center overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-leaf-pattern opacity-5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-forest-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-leaf/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="relative z-10 max-w-md px-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-green-lg"
          >
            <Leaf className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-display font-bold text-3xl text-white mb-4">Welcome to Scrapify</h2>
          <p className="text-forest-300 leading-relaxed">
            Your scrap has value. Sign in to manage your pickups, track earnings, and redeem Green Coins.
          </p>
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

          <h1 className="font-display font-bold text-3xl text-forest-900 mb-2">Sign in</h1>
          <p className="text-forest-500 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-forest-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-forest-700 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
