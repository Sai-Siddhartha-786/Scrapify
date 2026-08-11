# ♻️ Scrapify — Doorstep Scrap Pickup App

**Scrapify** is a full-stack MERN application that enables users to sell household scrap from their doorstep. Book an agent, get your scrap weighed, receive instant payment, and earn Green Coins rewards.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green) ![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

### Core
- **Doorstep Pickup Booking** — Multi-step booking flow with scrap selection, scheduling, and address
- **Real-time Rate Card** — 10+ scrap categories with daily-updated rates (Newspaper, Plastic, Iron, Copper, E-Waste, etc.)
- **Scrap Calculator** — Estimate your earnings before booking
- **Instant Payments** — UPI, Cash, or Wallet payment on pickup completion
- **Agent Assignment** — Verified agents assigned to each booking
- **Booking Lifecycle** — Full status tracking (pending → confirmed → agent assigned → completed)

### Gamification & Rewards
- **🪙 Green Coins** — Earn on every kg of scrap collected
- **🎁 Rewards Store** — Redeem coins for Amazon/Swiggy vouchers, cashback, merchandise, or plant a tree
- **🔥 Streak System** — Monthly pickup streaks with bonus coins every 3rd pickup
- **🏅 Badges** — Unlock achievements (Eco Newcomer, Regular Recycler, Eco Warrior, Century Club, Half Ton Hero)
- **🤝 Referral Program** — Share your code, both users get 100 Green Coins
- **⭐ Agent Rating** — Rate agents and earn 5 bonus coins

### Impact Tracking
- **CO₂ Saved** — Track your environmental contribution
- **Trees Equivalent** — See how many trees your recycling equals
- **Total Stats** — Earnings, weight recycled, pickups completed

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom green theme) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Express.js + Node.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Validation | express-validator |

---

## 📁 Project Structure

```
scrapify/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Navbar, shared components
│   │   ├── context/         # AuthContext (state management)
│   │   ├── pages/           # Landing, Login, Register, Dashboard,
│   │   │                    # BookPickup, Rates, Rewards, HowItWorks
│   │   ├── App.jsx          # Router + protected routes
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind + custom styles
│   ├── tailwind.config.js   # Custom forest-green theme
│   └── vite.config.js       # Dev server + API proxy
│
├── server/                  # Express backend
│   ├── config/db.js         # MongoDB connection
│   ├── middleware/auth.js    # JWT protect + role authorize
│   ├── models/
│   │   ├── User.js          # User with greenCoins, badges, streak
│   │   ├── Booking.js       # Booking with scrap items, status
│   │   ├── ScrapCategory.js # Scrap types with rates
│   │   └── Reward.js        # Rewards + Redemptions
│   ├── routes/
│   │   ├── auth.js          # Register, Login, Profile
│   │   ├── bookings.js      # CRUD + complete + rate
│   │   ├── scrapCategories.js
│   │   └── rewards.js       # List + redeem
│   ├── seed.js              # Seed DB with categories + rewards
│   ├── index.js             # Express server entry
│   └── .env                 # Environment variables
│
└── package.json             # Root scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/scrapify.git
cd scrapify

# Install all dependencies
npm run install:all
# or manually:
cd server && npm install && cd ../client && npm install && cd ..
```

### 2. Configure Environment

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scrapify
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
```

### 3. Seed the Database

```bash
npm run seed
# Creates: 10 scrap categories, 6 rewards, 1 admin user
```

### 4. Run Development

```bash
# Run both frontend & backend concurrently
npm run dev

# Or separately:
npm run server   # Express on :5000
npm run client   # Vite on :3000
```

Open **http://localhost:3000** in your browser.

---

## 🎨 Design System

The app uses a custom **forest green** theme inspired by organic, eco-conscious design:

- **Fonts**: Outfit (display), DM Sans (body), JetBrains Mono (data)
- **Primary**: Forest Green (#276749 → #1C4532)
- **Accent**: Leaf Green (#52B788)
- **Background**: Off-white (#FAFDF7) with subtle leaf patterns
- **Cards**: Glass-morphism with backdrop blur
- **Animations**: Framer Motion with staggered reveals

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List user bookings |
| GET | `/api/bookings/:id` | Get booking detail |
| PUT | `/api/bookings/:id/complete` | Agent completes pickup |
| PUT | `/api/bookings/:id/cancel` | Cancel booking |
| PUT | `/api/bookings/:id/rate` | Rate agent |

### Scrap Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/scrap-categories` | List all categories |

### Rewards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rewards` | List rewards |
| POST | `/api/rewards/:id/redeem` | Redeem reward |
| GET | `/api/rewards/my-redemptions` | User's redemptions |

---

## 🔜 Roadmap

- [ ] Real-time agent tracking with live map
- [ ] Push notifications for booking updates
- [ ] Razorpay integration for UPI payouts
- [ ] Admin dashboard for managing agents & bookings
- [ ] PWA support for mobile-first experience
- [ ] Community leaderboard
- [ ] Multi-city expansion

---

## 📄 License

MIT — Built by Vibhu with 🌿
