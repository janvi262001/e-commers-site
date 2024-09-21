import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes/index.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

connect(process.env.MONGO_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/api', router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
