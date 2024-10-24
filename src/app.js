import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './util/config.js';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './util/connection.js';

const app = express();
app.set('port', config.port)
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));


app.use('/api', userRoutes);
app.use('/api', authRoutes); 

const startServer = async () => {
    await connectDB();
    app.listen(app.get('port'), () => {
        console.log(`Server running on port ${app.get('port')}`)
    })
}
startServer();