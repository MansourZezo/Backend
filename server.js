const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// تحميل متغيرات البيئة من ملف .env
dotenv.config({ path: './config/config.env' });


// الاتصال بقاعدة البيانات
const DB = process.env.MONGO_URI || 'mongodb://localhost:27017/carelinkDB';
mongoose.connect(DB)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// تشغيل السيرفر
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
