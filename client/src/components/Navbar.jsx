import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, User, LogOut, Coins, LayoutDashboard, CalendarPlus, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';
  const navBg = scrolled || !isLanding
    ? 'bg-white/80 backdrop-blur-xl border-b border-forest-200/50 shadow-sm'
    : 'bg-transparent';

  const navLinks = [
    { to: '/rates', label: 'Scrap Rates' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/rewards', label: 'Rewards' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center shadow-green group-hover:shadow-green-lg transition-all duration-300 group-hover:scale-105">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-forest-900">
              Scrap<span className="text-forest-500">ify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`btn-ghost text-sm ${
                  location.pathname === link.to
                    ? 'bg-forest-100 text-forest-800'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Green Coins */}
                <div className="badge-green">
                  <Coins className="w-4 h-4 text-forest-600" />
                  <span className="font-mono font-semibold">{user.greenCoins || 0}</span>
                </div>

                {/* Book Pickup CTA */}
                <Link to="/book" className="btn-primary text-sm flex items-center gap-2">
                  <CalendarPlus className="w-4 h-4" />
                  Book Pickup
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-forest-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-forest-600 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 glass-card p-2 shadow-lg"
                      >
                        <div className="px-3 py-2 border-b border-forest-100 mb-1">
                          <p className="font-display font-semibold text-forest-900">{user.name}</p>
                          <p className="text-xs text-forest-500">{user.email}</p>
                        </div>
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-forest-50 text-sm text-forest-700 transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-forest-50 text-sm text-forest-700 transition-colors">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-sm text-red-600 transition-colors">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-forest-50">
            {mobileOpen ? <X className="w-6 h-6 text-forest-700" /> : <Menu className="w-6 h-6 text-forest-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-forest-200"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="block px-4 py-3 rounded-xl hover:bg-forest-50 font-display text-forest-800">
                  {link.label}
                </Link>
              ))}
              <hr className="border-forest-100 my-2" />
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display font-semibold">{user.name}</p>
                      <div className="badge-green text-xs mt-1">
                        <Coins className="w-3 h-3" /> {user.greenCoins} coins
                      </div>
                    </div>
                  </div>
                  <Link to="/book" className="block btn-primary text-center text-sm">Book Pickup</Link>
                  <Link to="/dashboard" className="block px-4 py-3 rounded-xl hover:bg-forest-50 font-display text-forest-800">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 font-display text-red-600">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 rounded-xl hover:bg-forest-50 font-display text-forest-800">Sign In</Link>
                  <Link to="/register" className="block btn-primary text-center text-sm">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
