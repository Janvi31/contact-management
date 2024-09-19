const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;