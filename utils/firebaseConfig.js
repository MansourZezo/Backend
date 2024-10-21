// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'healthcare-4b9bd.appspot.com'
});

module.exports = admin;
