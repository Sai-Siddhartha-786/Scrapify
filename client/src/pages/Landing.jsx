import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, Truck, Scale, Coins, Shield, Recycle, TreePine, 
  ArrowRight, Star, Zap, Clock, MapPin, ChevronRight, Sparkles, Phone
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const scrapRatesPreview = [
  { name: 'Newspaper', rate: '₹14/kg', icon: '📰', color: 'from-green-400 to-emerald-500' },
  { name: 'Cardboard', rate: '₹8/kg', icon: '📦', color: 'from-amber-400 to-orange-500' },
  { name: 'Plastic', rate: '₹10/kg', icon: '🧴', color: 'from-sky-400 to-blue-500' },
  { name: 'Iron / Steel', rate: '₹28/kg', icon: '🔩', color: 'from-slate-400 to-slate-600' },
  { name: 'Copper', rate: '₹420/kg', icon: '🔌', color: 'from-yellow-500 to-amber-600' },
  { name: 'Aluminium', rate: '₹105/kg', icon: '🥫', color: 'from-gray-400 to-gray-500' },
  { name: 'E-Waste', rate: '₹35/kg', icon: '💻', color: 'from-violet-400 to-purple-600' },
  { name: 'Glass', rate: '₹3/kg', icon: '🍾', color: 'from-teal-400 to-emerald-500' },
];

const steps = [
  { 
    step: '01', 
    title: 'Select Your Scrap', 
    desc: 'Pick the type and estimated weight of scrap you want to sell from our rate card.',
    icon: Scale,
    accent: 'bg-forest-100 text-forest-700'
  },
  { 
    step: '02', 
    title: 'Book a Pickup', 
    desc: 'Choose your preferred date, time slot, and share your address. That\'s it!',
    icon: Clock,
    accent: 'bg-emerald-100 text-emerald-700'
  },
  { 
    step: '03', 
    title: 'Agent Arrives', 
    desc: 'Our verified agent arrives at your door, weighs the scrap, and pays you instantly.',
    icon: Truck,
    accent: 'bg-green-100 text-green-700'
  },
  { 
    step: '04', 
    title: 'Earn Rewards', 
    desc: 'Get Green Coins on every pickup. Redeem for vouchers, cashback, or plant a tree!',
    icon: Sparkles,
    accent: 'bg-lime-100 text-lime-700'
  },
];

const stats = [
  { value: '50K+', label: 'Kg Recycled', icon: Recycle },
  { value: '2,000+', label: 'Happy Users', icon: Star },
  { value: '500+', label: 'Trees Planted', icon: TreePine },
  { value: '₹8L+', label: 'Paid to Users', icon: Coins },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 overflow-hidden noise-overlay">
        {/* Animated bg elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-forest-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-leaf/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-600/5 rounded-full blur-3xl" />
          
          {/* Floating leaves */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-forest-500/20"
              initial={{ y: -20, x: Math.random() * 100 + '%', rotate: 0, opacity: 0 }}
              animate={{ 
                y: '120vh', 
                rotate: 360, 
                opacity: [0, 0.4, 0.4, 0],
                x: `${Math.random() * 100}%`
              }}
              transition={{ 
                duration: 15 + Math.random() * 10, 
                repeat: Infinity, 
                delay: i * 2,
                ease: 'linear'
              }}
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700/50 border border-forest-600/30 rounded-full mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-forest-200 text-sm font-medium">Now serving Delhi NCR & Haryana</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight"
              >
                Your Scrap
                <br />
                <span className="relative">
                  <span className="green-gradient-text">Has Value.</span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <motion.path
                      d="M0 8 Q75 0 150 8 Q225 16 300 8"
                      fill="none"
                      stroke="#52B788"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </span>
                <br />
                <span className="text-forest-300">We Prove It.</span>
              </motion.h1>

              <motion.p 
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="mt-6 text-lg text-forest-300 max-w-lg leading-relaxed"
              >
                Book a doorstep pickup, get paid for your scrap by weight, and earn 
                <span className="text-leaf font-semibold"> Green Coins </span> 
                with every collection. Recycling never paid this well.
              </motion.p>

              <motion.div 
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link to="/register" className="group btn-primary text-base flex items-center gap-2 px-8 py-4">
                  Start Earning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/rates" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-8 py-4">
                  View Rates
                </Link>
              </motion.div>

              <motion.div 
                variants={fadeUp} initial="hidden" animate="visible" custom={4}
                className="mt-10 flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {['🧑', '👩', '🧔', '👨'].map((avatar, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-forest-700 border-2 border-forest-900 flex items-center justify-center text-sm">
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-forest-300 text-sm ml-1">4.9</span>
                  </div>
                  <p className="text-forest-400 text-sm">Trusted by 2,000+ users</p>
                </div>
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div 
              variants={scaleIn} initial="hidden" animate="visible" custom={2}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600/30 to-forest-800/20 rounded-full border border-forest-500/20 backdrop-blur-sm" />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl flex items-center justify-center shadow-green-lg animate-float">
                    <Recycle className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Orbiting cards */}
                {[
                  { icon: '📰', label: '₹14/kg', angle: 30, delay: 0 },
                  { icon: '🔩', label: '₹28/kg', angle: 110, delay: 0.2 },
                  { icon: '💻', label: '₹35/kg', angle: 200, delay: 0.4 },
                  { icon: '🔌', label: '₹420/kg', angle: 290, delay: 0.6 },
                ].map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 180;
                  const y = Math.sin(rad) * 180;
                  return (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, x, y }}
                      transition={{ duration: 0.6, delay: 0.8 + item.delay, ease: 'backOut' }}
                    >
                      <div className="glass-card px-4 py-3 flex items-center gap-2 animate-float" style={{ animationDelay: `${item.delay * 2}s` }}>
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-mono font-bold text-forest-800">{item.label}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100L48 89.5C96 79 192 58 288 50C384 42 480 46 576 54.5C672 63 768 75 864 75C960 75 1056 63 1152 54.5C1248 46 1344 42 1392 39.5L1440 37V100H0Z" fill="#FAFDF7"/>
          </svg>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-12 bg-[#FAFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-forest-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-forest-600" />
                </div>
                <p className="font-display font-black text-3xl md:text-4xl text-forest-900">{stat.value}</p>
                <p className="text-forest-500 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCRAP RATES CAROUSEL ===== */}
      <section className="py-20 bg-[#FAFDF7] bg-leaf-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-heading">Today's Scrap Rates</h2>
            <p className="section-subheading mx-auto mt-3">Transparent pricing. Updated daily. Best rates guaranteed.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {scrapRatesPreview.map((item, i) => (
              <motion.div
                key={item.name}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-5 text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  {item.icon}
                </div>
                <p className="font-display font-semibold text-forest-800">{item.name}</p>
                <p className="font-mono font-bold text-lg text-forest-600 mt-1">{item.rate}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-8">
            <Link to="/rates" className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-display font-semibold transition-colors">
              View all rates <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-gradient-to-b from-[#FAFDF7] to-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <div className="badge-green mx-auto mb-4 w-fit">
              <Zap className="w-4 h-4" /> Super Simple
            </div>
            <h2 className="section-heading">How Scrapify Works</h2>
            <p className="section-subheading mx-auto mt-3">From clutter to cash in 4 easy steps</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(100%_-_12px)] w-[calc(100%_-_48px)] border-t-2 border-dashed border-forest-300 z-0" />
                )}
                <div className="glass-card p-6 relative z-10 hover:shadow-green transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${step.accent} rounded-xl flex items-center justify-center`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-forest-400 font-bold">{step.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-forest-900 mb-2">{step.title}</h3>
                  <p className="text-forest-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GREEN COINS / REWARDS ===== */}
      <section className="py-24 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="badge-green mb-4">
                <Coins className="w-4 h-4" /> Rewards System
              </div>
              <h2 className="section-heading">Earn <span className="green-gradient-text">Green Coins</span> Every Time</h2>
              <p className="section-subheading mt-4">
                Every kilogram of scrap earns you Green Coins. Stack them up and redeem for real rewards — vouchers, cashback, or even plant a tree!
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { emoji: '🎉', title: 'Welcome Bonus', desc: '50 coins just for signing up' },
                  { emoji: '♻️', title: 'Per-Kg Earnings', desc: '8-30 coins per kg depending on material' },
                  { emoji: '🔥', title: 'Streak Rewards', desc: 'Every 3rd monthly pickup earns 50 bonus coins' },
                  { emoji: '🤝', title: 'Refer & Earn', desc: '100 coins for you + 100 for your friend' },
                  { emoji: '⭐', title: 'Rate Your Agent', desc: '5 coins for every rating you leave' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/70 transition-colors"
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                    <div>
                      <h4 className="font-display font-semibold text-forest-900">{item.title}</h4>
                      <p className="text-forest-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/rewards" className="inline-flex items-center gap-2 mt-8 btn-primary">
                Explore Rewards <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div 
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative"
            >
              {/* Reward card mockup */}
              <div className="relative mx-auto max-w-sm">
                <div className="glass-card-dark p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-forest-300 text-sm font-medium">Your Balance</p>
                  <p className="font-display font-black text-5xl text-white mt-1">1,250</p>
                  <p className="text-forest-400 text-sm mt-1">Green Coins</p>
                  
                  <div className="mt-6 space-y-3">
                    {[
                      { name: '₹50 Cashback', coins: 200, icon: '💰' },
                      { name: 'Plant a Tree', coins: 500, icon: '🌳' },
                      { name: '₹100 Amazon Voucher', coins: 800, icon: '🎁' },
                    ].map(reward => (
                      <div key={reward.name} className="flex items-center justify-between px-4 py-3 bg-forest-800/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{reward.icon}</span>
                          <span className="text-forest-200 text-sm font-medium">{reward.name}</span>
                        </div>
                        <span className="font-mono text-xs text-forest-400">{reward.coins} coins</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-leaf/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-forest-600/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY SCRAPIFY ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading">Why Choose Scrapify?</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Verified Agents', desc: 'Every agent is background-verified and trained. Your safety is our priority.', color: 'bg-emerald-100 text-emerald-700' },
              { icon: Scale, title: 'Fair Digital Weighing', desc: 'Transparent weighing with digital scales. No haggling, no tricks — just fair prices.', color: 'bg-forest-100 text-forest-700' },
              { icon: Zap, title: 'Instant Payments', desc: 'Get paid on the spot via Cash, UPI, or wallet. No delays, no minimum amounts.', color: 'bg-lime-100 text-lime-700' },
              { icon: MapPin, title: 'Doorstep Service', desc: 'We come to you. No need to carry heavy scrap anywhere — we handle everything.', color: 'bg-green-100 text-green-700' },
              { icon: TreePine, title: 'Planet-Positive', desc: 'Track your environmental impact. Every pickup counts towards a greener planet.', color: 'bg-teal-100 text-teal-700' },
              { icon: Phone, title: 'Easy Booking', desc: 'Book in under 30 seconds. Pick a slot, add your scrap, and you\'re done.', color: 'bg-cyan-100 text-cyan-700' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-6 rounded-2xl hover:bg-forest-50/50 transition-colors group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-forest-900 mb-2">{feature.title}</h3>
                <p className="text-forest-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-leaf-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-leaf/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
              Ready to Turn Your Scrap
              <br />
              <span className="green-gradient-text">Into Cash?</span>
            </h2>
            <p className="mt-6 text-forest-300 text-lg max-w-xl mx-auto">
              Join thousands of people already earning from their recyclable waste. Your first pickup is just a click away.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="group btn-primary text-lg px-10 py-4 flex items-center justify-center gap-3">
                <Leaf className="w-5 h-5" />
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="mt-4 text-forest-500 text-sm">
              🎁 Get 50 Green Coins welcome bonus on signup
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-forest-950 text-forest-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-white">Scrapify</span>
              </div>
              <p className="text-sm leading-relaxed">
                India's smartest doorstep scrap pickup service. Sell your scrap, earn money, save the planet.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/rates" className="block hover:text-forest-200 transition-colors">Scrap Rates</Link>
                <Link to="/how-it-works" className="block hover:text-forest-200 transition-colors">How It Works</Link>
                <Link to="/rewards" className="block hover:text-forest-200 transition-colors">Green Coins</Link>
                <Link to="/book" className="block hover:text-forest-200 transition-colors">Book Pickup</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-forest-200 transition-colors">About Us</a>
                <a href="#" className="block hover:text-forest-200 transition-colors">Become an Agent</a>
                <a href="#" className="block hover:text-forest-200 transition-colors">Blog</a>
                <a href="#" className="block hover:text-forest-200 transition-colors">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-forest-200 transition-colors">Help Center</a>
                <a href="#" className="block hover:text-forest-200 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-forest-200 transition-colors">Terms of Service</a>
                <a href="mailto:hello@scrapify.in" className="block hover:text-forest-200 transition-colors">hello@scrapify.in</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-forest-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 Scrapify. All rights reserved.</p>
            <p className="text-sm flex items-center gap-1">
              Made with <span className="text-red-400">❤</span> for a greener India <Leaf className="w-4 h-4 text-forest-500" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
