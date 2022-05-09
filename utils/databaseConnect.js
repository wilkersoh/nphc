import mongoose from "mongoose";

let connection = {};

const mongoDbConnect = async () => {
  if( connection.isConnected ) return;

  const db = await mongoose.connect( process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  });

  connection.isConnected = db.connections[0].readyState;
}

export default mongoDbConnect;
