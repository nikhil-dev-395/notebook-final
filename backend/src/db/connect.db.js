//~ connect.db.js

import mongoose from "mongoose";

const connectDb = async() => {     

    try {
       const db = await mongoose.connect(`${process.env.DB_URL}`);

        console.log("MongoDB Connected...", db.connection.host);
    } catch (error) {
        console.log(error.message);

    }

};

export default connectDb;
