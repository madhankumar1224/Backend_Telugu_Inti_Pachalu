const express = require('express');

const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./Database/db');
const userRoute =require('./Routing/useRouting');
const {errorProblem}=require('./Middlewares/errorHandler');

// Load environment variables
dotenv.config();


connectDB();


const app = express();
const corsOption={
    origin:'http://localhost:5173',
    methods:['GET', 'PUT', 'POST','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials:true
}
app.use(cors(corsOption));

// Middleware to parse JSON
app.use(express.json());

app.use('/user',userRoute);
app.use(errorProblem);
// app.get('/', (req, res) => {

//   res.send('Hello World!');
// });


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});