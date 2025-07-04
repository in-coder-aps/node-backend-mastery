import mongoose from "mongoose";

//Define the mongodb connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

//Setup mongoDB connection
mongoose.connect(mongoURL);

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event liestenrs for the database connection 

// Listen for events
db.on("connected", () => console.log("✅ MongoDB connected"));
db.on("error", (err) => console.error("❌ MongoDB error:", err));
db.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

export default db;
