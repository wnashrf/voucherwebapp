require('./config/env');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Voucher = require('./models/Voucher');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data to avoid duplicates
        await Category.deleteMany({});
        await Voucher.deleteMany({});

        console.log('Cleaning existing data...');

        // 1. Create 3 Categories
        const categories = await Category.insertMany([
            { name: 'Food & Beverage' },
            { name: 'Shopping' },
            { name: 'Travel' }
        ]);

        console.log('Categories seeded.');

        // 2. Create 5 Vouchers
        const vouchers = [
            {
                title: 'Starbucks RM10 Voucher',
                description: 'Valid for all handcrafted beverages.',
                image: 'https://images.unsplash.com/photo-1544411047-c491574abbde',
                points: 1000,
                category_id: categories[0]._id
            },
            {
                title: 'GrabFood RM20 Discount',
                description: 'Minimum spend of RM40 required.',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
                points: 2000,
                category_id: categories[0]._id
            },
            {
                title: 'Shopee RM50 Gift Card',
                description: 'No minimum spend. Valid for 1 year.',
                image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
                points: 5000,
                category_id: categories[1]._id
            },
            {
                title: 'Uniqlo RM30 Instant Rebate',
                description: 'Valid at all physical outlets.',
                image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
                points: 3000,
                category_id: categories[1]._id
            },
            {
                title: 'Agoda 15% Hotel Discount',
                description: 'Applicable for selected hotels worldwide.',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                points: 4500,
                category_id: categories[2]._id
            }
        ];

        await Voucher.insertMany(vouchers);
        console.log('Vouchers seeded.');

        console.log('Database successfully seeded!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
