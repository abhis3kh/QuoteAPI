const express = require('express');
const cors = require('cors');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const app = express();

// CORS is enabled for all origins
app.use(cors());

// Connecting to database
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(URI, { useNewUrlParser: true });
client.connect((err) => {
  if (err) {
    //not connected
    console.error(err);
    process.exit(1);
  }
  // The connection will never be closed if connected
});
//will connect to Quote database always as it is the only thing we have built this app for
const database = client.db('Quote');
const quotes = database.collection('quotes');

//Sending a Intro Page for the API
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

//sending a random quote
app.get('/quote', async (request, response) => {
  const pipeline = [{ $sample: { size: 1 } }, { $limit: 1 }];

  // Fetch a single random document using the aggregation pipeline
  const [randomQuote] = await quotes.aggregate(pipeline).toArray();

  // Send the random quote as the response
  response.json(randomQuote);
});

//Give only quotes which corresponds to to that field
app.get('/quote/:field', async (req, response) => {
  const field = req.params.field;
  const regex = new RegExp(field, 'i');
  // passing the field value
  const pipeline = [
    { $match: { field: regex } },
    { $sample: { size: 1 } },
    { $limit: 1 },
  ];

  // Fetch a single random document matching the field value using the aggregation pipeline
  const [randomQuote] = await quotes.aggregate(pipeline).toArray();
  // to search case insenstively
  response.json(randomQuote);
});

// Give all quotes present in the database
app.get('/quotes', async (request, response) => {
  // Reading data using the find() method
  const cursor = quotes.find();
  const documents = await cursor.toArray();
  response.json(documents);
});
app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});

//Give only quotes which corresponds to to that field
app.get('/quotes/:field', async (req, response) => {
  const field = req.params.field;
  // to search case insenstively
  const regex = new RegExp(field, 'i');
  const allFieldDocuments = quotes.find({ field: regex });
  const arrayDocs = await allFieldDocuments.toArray();
  response.json(arrayDocs);
});
