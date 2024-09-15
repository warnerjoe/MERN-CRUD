const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connects to DB using the MONGO_URI environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Logs the host property of the conn.connection object
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;