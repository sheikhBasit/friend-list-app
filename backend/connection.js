const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/friends');
    console.log('Mongoose is connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Terminate the application on connection failure
  }
};

// Close the Mongoose connection when the Node process exits
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

module.exports = connection;
