const newrelic = require('newrelic');

const express = require('express');
const cors = require('cors');
const path = require('path');
const { getListing } = require('./controllers/reviews.js');

const app = express();
const port = 3003;

app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/listing/:id', express.static(path.join(__dirname, '../client/dist')));
app.use('/bundle.js', express.static(path.join(__dirname, '../client/dist/bundle.js')));

app.get('/api/listing/:id', getListing);

app.listen(port, () => console.log(`Listening on port ${port}`));
