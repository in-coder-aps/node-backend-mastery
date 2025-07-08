import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import './db.js';
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import passport from './middlewares/basicAuth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to log the time and path of each incoming request
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req._parsedUrl.pathname}`);
    next();
}

app.use(logRequest);
app.use(bodyParser.json());
app.use(passport.initialize());
// const basicAuthMiddleware = passport.authenticate('basic', { session: false });

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.get('/', (req, res) => {
    res.send("<h1>🍽️ Welcome to the Data Kitchen — Where We Cook APIs and Serve Exactly What You Crave!</h1>");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});