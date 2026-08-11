import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scale, Clock, Truck, Sparkles, Shield, Leaf, ArrowRight, 
  Smartphone, MapPin, CreditCard, Star, Recycle, HelpCircle
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } })
};

const steps = [
  {
    icon: Smartphone,
    title: 'Select Your Scrap',
    desc: 'Browse our rate card and pick the categories of scrap you want to sell. Newspaper, plastic, iron, e-waste — we accept it all.',
    tip: 'You can add multiple scrap types in a single booking!',
    color: 'from-forest-400 to-forest-600'
  },
  {
    icon: Clock,
    title: 'Choose Date & Slot',
    desc: 'Pick a convenient date (as early as tomorrow) and one of our 4 time slots. We work around your schedule.',
    tip: 'Morning slots tend to be fastest.',
    color: 'from-emerald-400 to-green-600'
  },
  {
    icon: MapPin,
    title: 'Add Your Address',
    desc: 'Enter your pickup address and any landmarks. Our agent will come right to your door — no heavy lifting for you.',
    tip: 'Save your address to auto-fill it on future bookings.',
    color: 'from-teal-400 to-teal-600'
  },
  {
    icon: Truck,
    title: 'Agent Arrives',
    desc: 'A verified Scrapify agent arrives at your scheduled slot with a digital weighing scale. Transparent and fair.',
    tip: 'You can track agent status in real-time from your dashboard.',
    color: 'from-green-400 to-emerald-600'
  },
  {
    icon: Scale,
    title: 'Weigh & Evaluate',
    desc: 'Your scrap is weighed right in front of you. The value is calculated automatically based on current market rates.',
    tip: 'No haggling! What the scale says, you get paid.',
    color: 'from-lime-400 to-green-600'
  },
  {
    icon: CreditCard,
    title: 'Get Paid Instantly',
    desc: 'Receive payment immediately via UPI, cash, or wallet. No delays, no minimum amount required.',
    tip: 'UPI payments reflect in under 30 seconds.',
    color: 'from-forest-500 to-forest-700'
  },
  {
    icon: Sparkles,
    title: 'Earn Green Coins',
    desc: 'Earn Green Coins on every kg of scrap collected, plus bonus coins for booking, rating, streaks, and referrals!',
    tip: 'Redeem coins for Amazon vouchers, cashback, or plant a tree.',
    color: 'from-amber-400 to-yellow-500'
  },
];

const faqs = [
  {
    q: 'What is the minimum scrap quantity?',
    a: 'There\'s no strict minimum, but we recommend at least 5 kg for a worthwhile pickup. Our agents are happy to collect any amount though!'
  },
  {
    q: 'How are scrap rates decided?',
    a: 'We update rates daily based on market prices. We ensure you always get fair value — often better than what local kabadiwallas offer.'
  },
  {
    q: 'Are the agents verified?',
    a: 'Yes, every Scrapify agent undergoes thorough background verification and training before joining our fleet.'
  },
  {
    q: 'Can I cancel a booking?',
    a: 'You can cancel any time before the agent is dispatched, completely free of charge, from your dashboard.'
  },
  {
    q: 'What are Green Coins?',
    a: 'Green Coins are our rewards currency. Earn them on every pickup and redeem for vouchers, cashback, donations, or merchandise.'
  },
  {
    q: 'Which areas do you serve?',
    a: 'We currently serve Delhi NCR and parts of Haryana. We\'re expanding rapidly — join the waitlist for your city!'
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
          <div className="badge-green mx-auto w-fit mb-4">
            <Recycle className="w-4 h-4" /> Simple & Fast
          </div>
          <h1 className="section-heading">How Scrapify Works</h1>
          <p className="section-subheading mx-auto mt-3">
            From scrap to cash in 7 easy steps. Here's the full journey.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-forest-300 via-leaf to-forest-300" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-6"
              >
                {/* Step number */}
                <div className="hidden md:flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-green relative z-10`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass-card p-6 hover:shadow-green transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2 md:hidden">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-mono text-sm text-forest-400 font-bold">Step {i + 1}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="hidden md:inline font-mono text-sm text-forest-400 font-bold">Step {i + 1}</span>
                    <h3 className="font-display font-bold text-xl text-forest-900">{step.title}</h3>
                  </div>
                  <p className="text-forest-600 leading-relaxed mb-3">{step.desc}</p>
                  <div className="flex items-start gap-2 p-3 bg-forest-50 rounded-xl">
                    <span className="text-sm">💡</span>
                    <p className="text-sm text-forest-600 italic">{step.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-16 mb-20">
          <Link to="/book" className="inline-flex items-center gap-3 btn-primary text-lg px-10 py-4">
            <Leaf className="w-5 h-5" /> Book Your First Pickup <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* FAQs */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-heading text-center mb-10 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-forest-500" /> FAQs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="glass-card p-5"
              >
                <h4 className="font-display font-semibold text-forest-900 mb-2">{faq.q}</h4>
                <p className="text-forest-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
