require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true,  useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());

const eventRouter = require('./routes/event');
app.use('/event', eventRouter);

app.listen(3000, () => {
    console.log('Server started');
})