const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ScrapCategory = require('./models/ScrapCategory');
const { Reward } = require('./models/Reward');
const User = require('./models/User');

dotenv.config();

const scrapCategories = [
  {
    name: 'Newspaper',
    icon: '📰',
    description: 'Old newspapers, magazines, pamphlets',
    ratePerKg: 14,
    co2PerKg: 0.9,
    greenCoinsPerKg: 12,
    color: '#52B788'
  },
  {
    name: 'Cardboard',
    icon: '📦',
    description: 'Corrugated boxes, packaging material',
    ratePerKg: 8,
    co2PerKg: 0.7,
    greenCoinsPerKg: 10,
    color: '#40916C'
  },
  {
    name: 'Plastic',
    icon: '🧴',
    description: 'PET bottles, containers, plastic waste',
    ratePerKg: 10,
    co2PerKg: 1.5,
    greenCoinsPerKg: 15,
    color: '#2D6A4F'
  },
  {
    name: 'Iron / Steel',
    icon: '🔩',
    description: 'Iron rods, steel utensils, metal scrap',
    ratePerKg: 28,
    co2PerKg: 1.8,
    greenCoinsPerKg: 20,
    color: '#1B4332'
  },
  {
    name: 'Copper',
    icon: '🔌',
    description: 'Copper wire, pipes, electrical components',
    ratePerKg: 420,
    co2PerKg: 3.0,
    greenCoinsPerKg: 30,
    color: '#B7791F'
  },
  {
    name: 'Aluminium',
    icon: '🥫',
    description: 'Cans, foils, aluminium utensils',
    ratePerKg: 105,
    co2PerKg: 2.5,
    greenCoinsPerKg: 25,
    color: '#718096'
  },
  {
    name: 'E-Waste',
    icon: '💻',
    description: 'Old phones, laptops, electronics, batteries',
    ratePerKg: 35,
    co2PerKg: 2.0,
    greenCoinsPerKg: 25,
    color: '#553C9A'
  },
  {
    name: 'Glass',
    icon: '🍾',
    description: 'Bottles, jars, broken glass',
    ratePerKg: 3,
    co2PerKg: 0.3,
    greenCoinsPerKg: 8,
    color: '#38A169'
  },
  {
    name: 'Books / Copies',
    icon: '📚',
    description: 'Old books, notebooks, textbooks',
    ratePerKg: 12,
    co2PerKg: 0.8,
    greenCoinsPerKg: 12,
    color: '#2F855A'
  },
  {
    name: 'Mixed Scrap',
    icon: '🗑️',
    description: 'Mixed recyclable waste',
    ratePerKg: 6,
    co2PerKg: 0.4,
    greenCoinsPerKg: 8,
    color: '#276749'
  }
];

const rewards = [
  {
    name: '₹50 Cashback',
    description: 'Get ₹50 cashback on your next pickup',
    icon: '💰',
    coinsRequired: 200,
    category: 'cashback',
    value: 50
  },
  {
    name: '10% Extra on Next Pickup',
    description: '10% bonus on scrap value for next pickup',
    icon: '📈',
    coinsRequired: 150,
    category: 'discount',
    value: 10
  },
  {
    name: 'Plant a Tree',
    description: 'We plant a tree on your behalf via Grow-Trees.com',
    icon: '🌳',
    coinsRequired: 500,
    category: 'donation',
    value: 1
  },
  {
    name: '₹100 Amazon Voucher',
    description: 'Amazon gift card worth ₹100',
    icon: '🎁',
    coinsRequired: 800,
    category: 'voucher',
    value: 100,
    partnerName: 'Amazon'
  },
  {
    name: 'Scrapify Eco Tote Bag',
    description: 'Exclusive reusable bag made from recycled material',
    icon: '👜',
    coinsRequired: 1000,
    category: 'merchandise',
    value: 1,
    stock: 50
  },
  {
    name: '₹200 Swiggy Voucher',
    description: 'Swiggy food delivery voucher',
    icon: '🍔',
    coinsRequired: 1500,
    category: 'voucher',
    value: 200,
    partnerName: 'Swiggy'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await ScrapCategory.deleteMany({});
    await Reward.deleteMany({});

    // Seed categories
    await ScrapCategory.insertMany(scrapCategories);
    console.log('✅ Scrap categories seeded');

    // Seed rewards
    await Reward.insertMany(rewards);
    console.log('✅ Rewards seeded');

    // Create demo admin
    const adminExists = await User.findOne({ email: 'admin@scrapify.in' });
    if (!adminExists) {
      await User.create({
        name: 'Scrapify Admin',
        email: 'admin@scrapify.in',
        phone: '9999999999',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    console.log('\n🌿 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
