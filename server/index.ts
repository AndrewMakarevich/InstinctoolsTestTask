require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL!)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
start();

