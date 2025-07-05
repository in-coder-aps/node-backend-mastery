import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import './db.js';
import express from 'express';
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>🍽️ Welcome to the Data Kitchen — Where We Cook APIs and Serve Exactly What You Crave!</h1>");
});

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});