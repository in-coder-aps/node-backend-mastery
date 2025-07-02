import express from 'express';
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send("<h1>🍽️ Welcome to the Data Kitchen — Where We Cook APIs and Serve Exactly What You Crave!</h1>");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});