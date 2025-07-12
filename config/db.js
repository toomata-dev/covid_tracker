import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
            
        );

        console.log(`MongoDB is Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1); //if fail exit function and avoid re-running it over and over again
    }
}

export default connectDB;

// process
// useUnifiedTopology
// useNewUrlParser