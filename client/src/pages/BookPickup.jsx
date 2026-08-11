import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, Clock, MapPin, Package, CreditCard, ChevronRight,
  ChevronLeft, Plus, Minus, Trash2, Loader2, CheckCircle2, Leaf, Coins
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const timeSlots = ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM'];

export default function BookPickup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    scrapItems: [],
    scheduledDate: '',
    scheduledSlot: '',
    pickupAddress: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
      landmark: user?.address?.landmark || '',
    },
    paymentMethod: 'upi',
    notes: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/scrap-categories');
      setCategories(res.data.data);
    } catch { /* handled */ } finally {
      setLoading(false);
    }
  };

  const addItem = (cat) => {
    const exists = form.scrapItems.find(i => i.category === cat._id);
    if (exists) return;
    setForm({
      ...form,
      scrapItems: [...form.scrapItems, {
        category: cat._id,
        categoryName: cat.name,
        icon: cat.icon,
        ratePerKg: cat.ratePerKg,
        estimatedWeight: 5,
        greenCoinsPerKg: cat.greenCoinsPerKg,
      }]
    });
  };

  const removeItem = (catId) => {
    setForm({ ...form, scrapItems: form.scrapItems.filter(i => i.category !== catId) });
  };

  const updateWeight = (catId, delta) => {
    setForm({
      ...form,
      scrapItems: form.scrapItems.map(i =>
        i.category === catId ? { ...i, estimatedWeight: Math.max(1, i.estimatedWeight + delta) } : i
      )
    });
  };

  const totalEstWeight = form.scrapItems.reduce((s, i) => s + i.estimatedWeight, 0);
  const totalEstValue = form.scrapItems.reduce((s, i) => s + i.estimatedWeight * i.ratePerKg, 0);
  const totalEstCoins = form.scrapItems.reduce((s, i) => s + i.estimatedWeight * i.greenCoinsPerKg, 0);

  const canProceed = () => {
    if (step === 1) return form.scrapItems.length > 0;
    if (step === 2) return form.scheduledDate && form.scheduledSlot;
    if (step === 3) return form.pickupAddress.street && form.pickupAddress.city && form.pickupAddress.pincode;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post('/api/bookings', form);
      setSuccess(res.data.data);
      toast.success('Pickup booked! 🌿 +20 Green Coins');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-10 max-w-md mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="font-display font-bold text-2xl text-forest-900 mb-2">Pickup Booked!</h2>
          <p className="text-forest-500 mb-4">Your booking ID is</p>
          <div className="bg-forest-50 rounded-xl px-6 py-3 mb-6">
            <p className="font-mono font-bold text-xl text-forest-800">{success.bookingId}</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-forest-600 mb-6">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {new Date(success.scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {success.scheduledSlot}
            </div>
          </div>
          <div className="badge-green mx-auto w-fit mb-6">
            <Coins className="w-4 h-4" /> +20 Green Coins earned!
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex-1 btn-secondary text-sm">Dashboard</button>
            <button onClick={() => { setSuccess(null); setStep(1); setForm({ ...form, scrapItems: [] }); }} className="flex-1 btn-primary text-sm">Book Another</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFDF7] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {['Select Scrap', 'Schedule', 'Address', 'Confirm'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > i + 1 ? 'bg-forest-600 text-white' : step === i + 1 ? 'bg-forest-700 text-white shadow-green' : 'bg-forest-100 text-forest-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`hidden sm:inline ml-2 text-sm font-medium ${step >= i + 1 ? 'text-forest-800' : 'text-forest-400'}`}>{label}</span>
              {i < 3 && <ChevronRight className="w-4 h-4 text-forest-300 mx-2 hidden sm:inline" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display font-bold text-2xl text-forest-900 mb-2">What scrap do you have?</h2>
              <p className="text-forest-500 mb-6">Select categories and estimate the weight</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {categories.map(cat => {
                  const selected = form.scrapItems.find(i => i.category === cat._id);
                  return (
                    <button
                      key={cat._id}
                      onClick={() => selected ? removeItem(cat._id) : addItem(cat)}
                      className={`p-4 rounded-xl text-center transition-all ${
                        selected
                          ? 'bg-forest-700 text-white shadow-green'
                          : 'glass-card hover:border-forest-400 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className={`block text-xs font-mono mt-0.5 ${selected ? 'text-forest-200' : 'text-forest-500'}`}>₹{cat.ratePerKg}/kg</span>
                    </button>
                  );
                })}
              </div>

              {form.scrapItems.length > 0 && (
                <div className="glass-card p-5 space-y-3">
                  <h3 className="font-display font-semibold text-forest-800 text-sm">Selected Items</h3>
                  {form.scrapItems.map(item => (
                    <div key={item.category} className="flex items-center justify-between p-3 bg-forest-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-forest-800">{item.categoryName}</p>
                          <p className="text-xs text-forest-500">₹{item.ratePerKg}/kg</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateWeight(item.category, -1)} className="w-8 h-8 rounded-lg bg-white border border-forest-200 flex items-center justify-center hover:bg-forest-50">
                          <Minus className="w-4 h-4 text-forest-600" />
                        </button>
                        <span className="font-mono font-bold text-forest-800 w-12 text-center">{item.estimatedWeight}kg</span>
                        <button onClick={() => updateWeight(item.category, 1)} className="w-8 h-8 rounded-lg bg-white border border-forest-200 flex items-center justify-center hover:bg-forest-50">
                          <Plus className="w-4 h-4 text-forest-600" />
                        </button>
                        <button onClick={() => removeItem(item.category)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 ml-1">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-forest-200 text-sm">
                    <span className="text-forest-600">Estimated total: <strong className="text-forest-800">{totalEstWeight} kg</strong></span>
                    <span className="font-mono font-bold text-forest-800">≈ ₹{totalEstValue}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2 - Schedule */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display font-bold text-2xl text-forest-900 mb-2">Pick a date & time</h2>
              <p className="text-forest-500 mb-6">When should our agent visit?</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Pickup Date</label>
                  <input
                    type="date"
                    min={minDate}
                    value={form.scheduledDate}
                    onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">Time Slot</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setForm({ ...form, scheduledSlot: slot })}
                        className={`p-4 rounded-xl text-center font-medium transition-all ${
                          form.scheduledSlot === slot
                            ? 'bg-forest-700 text-white shadow-green'
                            : 'glass-card hover:border-forest-400'
                        }`}
                      >
                        <Clock className={`w-5 h-5 mx-auto mb-1 ${form.scheduledSlot === slot ? 'text-forest-200' : 'text-forest-500'}`} />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 - Address */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display font-bold text-2xl text-forest-900 mb-2">Pickup Address</h2>
              <p className="text-forest-500 mb-6">Where should we come?</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Street / Building</label>
                  <input
                    type="text"
                    value={form.pickupAddress.street}
                    onChange={(e) => setForm({ ...form, pickupAddress: { ...form.pickupAddress, street: e.target.value } })}
                    className="input-field"
                    placeholder="House/Flat No, Street Name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-1.5">City</label>
                    <input
                      type="text"
                      value={form.pickupAddress.city}
                      onChange={(e) => setForm({ ...form, pickupAddress: { ...form.pickupAddress, city: e.target.value } })}
                      className="input-field"
                      placeholder="Delhi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-1.5">State</label>
                    <input
                      type="text"
                      value={form.pickupAddress.state}
                      onChange={(e) => setForm({ ...form, pickupAddress: { ...form.pickupAddress, state: e.target.value } })}
                      className="input-field"
                      placeholder="Haryana"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-1.5">Pincode</label>
                    <input
                      type="text"
                      value={form.pickupAddress.pincode}
                      onChange={(e) => setForm({ ...form, pickupAddress: { ...form.pickupAddress, pincode: e.target.value } })}
                      className="input-field"
                      placeholder="122413"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-1.5">Landmark</label>
                    <input
                      type="text"
                      value={form.pickupAddress.landmark}
                      onChange={(e) => setForm({ ...form, pickupAddress: { ...form.pickupAddress, landmark: e.target.value } })}
                      className="input-field"
                      placeholder="Near..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'upi', label: 'UPI', icon: '📱' },
                      { value: 'cash', label: 'Cash', icon: '💵' },
                      { value: 'wallet', label: 'Wallet', icon: '👛' },
                    ].map(pm => (
                      <button
                        key={pm.value}
                        onClick={() => setForm({ ...form, paymentMethod: pm.value })}
                        className={`p-3 rounded-xl text-center text-sm font-medium transition-all ${
                          form.paymentMethod === pm.value ? 'bg-forest-700 text-white shadow-green' : 'glass-card'
                        }`}
                      >
                        <span className="text-lg block mb-0.5">{pm.icon}</span>
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input-field h-20 resize-none"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4 - Confirm */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display font-bold text-2xl text-forest-900 mb-6">Confirm Booking</h2>

              <div className="glass-card p-6 space-y-5">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-forest-400 font-semibold mb-3">Scrap Items</h4>
                  {form.scrapItems.map(item => (
                    <div key={item.category} className="flex justify-between py-2">
                      <span className="text-forest-700">{item.icon} {item.categoryName} × {item.estimatedWeight}kg</span>
                      <span className="font-mono text-forest-800">≈ ₹{item.estimatedWeight * item.ratePerKg}</span>
                    </div>
                  ))}
                  <div className="border-t border-forest-200 pt-2 mt-2 flex justify-between font-bold">
                    <span className="text-forest-800">Estimated Total</span>
                    <span className="font-mono text-forest-900">≈ ₹{totalEstValue}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-forest-400 font-semibold mb-2">Schedule</h4>
                  <p className="text-forest-800">
                    {new Date(form.scheduledDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    {' • '}{form.scheduledSlot}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-forest-400 font-semibold mb-2">Address</h4>
                  <p className="text-forest-800">
                    {form.pickupAddress.street}, {form.pickupAddress.city}
                    {form.pickupAddress.state && `, ${form.pickupAddress.state}`} - {form.pickupAddress.pincode}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-forest-400 font-semibold mb-2">Payment</h4>
                  <p className="text-forest-800 capitalize">{form.paymentMethod}</p>
                </div>

                <div className="bg-forest-50 rounded-xl p-4 flex items-center gap-3">
                  <Coins className="w-6 h-6 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-forest-800">You'll earn approx. {totalEstCoins + 20} Green Coins</p>
                    <p className="text-xs text-forest-500">{totalEstCoins} from scrap + 20 booking bonus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1}
            className="btn-ghost flex items-center gap-2 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="btn-primary flex items-center gap-2"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Leaf className="w-5 h-5" /> Confirm Booking</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
