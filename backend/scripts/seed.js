require('dotenv').config();
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Voucher = require('../models/Voucher');

async function seedDatabase() {
  try {
    await connectDB();

    // Remove old seed data to keep the database consistent
    await Voucher.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Home & Garden' }
    ]);

    const categoryMap = categories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    await Voucher.insertMany([
      {
        title: 'Wireless Headphones',
        description: 'Redeem for a premium pair of wireless headphones.',
        image: 'https://example.com/images/headphones.png',
        points: 150,
        category_id: categoryMap['Electronics']
      },
      {
        title: 'E-Book Gift Card',
        description: 'Use on your next digital book purchase.',
        image: 'https://example.com/images/ebook.png',
        points: 50,
        category_id: categoryMap['Books']
      },
      {
        title: 'Smart Light Bulb',
        description: 'Save energy with a Wi-Fi enabled smart bulb.',
        image: 'https://example.com/images/lightbulb.png',
        points: 120,
        category_id: categoryMap['Home & Garden']
      },
      {
        title: 'Coffee Maker Discount',
        description: 'Redeem for a discount on a popular coffee maker.',
        image: 'https://example.com/images/coffeemaker.png',
        points: 200,
        category_id: categoryMap['Home & Garden']
      },
      {
        title: 'Novel Bundle',
        description: 'Pick up a curated bundle of bestselling novels.',
        image: 'https://example.com/images/novel-bundle.png',
        points: 80,
        category_id: categoryMap['Books']
      }
    ]);

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
