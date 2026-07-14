const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
        console.error(`Database connection error: ${error}`);
    process.exit(1); // Stop the app if connection fails
  }
};


module.exports = connectDB;









// const { MongoClient, ServerApiVersion } = require('mongodb');
// //const uri = "mongodb://madhankumar1800_db_user:<db_password>@ac-rs9d0r4-shard-00-00.mdqyitl.mongodb.net:27017,ac-rs9d0r4-shard-00-01.mdqyitl.mongodb.net:27017,ac-rs9d0r4-shard-00-02.mdqyitl.mongodb.net:27017/?ssl=true&replicaSet=atlas-xmxf4x-shard-0&authSource=admin&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGO_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


// module.exports =run;
// //run().catch(console.dir);
