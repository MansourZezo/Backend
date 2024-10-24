const express = require('express');
const admin = require('../utils/firebaseConfig');

const router = express.Router();

router.post('/send-notification', (req, res) => {
    const { token, title, body } = req.body;

    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    admin.messaging().send(message)
        .then(response => {
            console.log('Successfully sent message:', response);
            res.status(200).send('Notification sent successfully!');
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.status(500).send('Error sending notification');
        });
});

module.exports = router;
