const e = require('cors');
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/friends');
        mongoose.connection.on('open', () => { console.log('Mongoose is connected') });
    } catch (error) {
        console.log(error);
    }
    }
connection();
module.exports = connection;