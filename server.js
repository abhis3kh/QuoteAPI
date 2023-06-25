const express = require('express');
const cors = require('cors');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

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

//? POST /quotes - This endpoint allows users to add new quotes to your database. Users can submit the quote content, author, and any relevant tags or categories. It can be used to create a collection of user-generated quotes or to allow administrators to add new quotes to the database.

app.post('/quote', (req, res) => {
  const { quote, quotedBy, field } = req.body;
  const newQuote = {
    quote,
    quotedBy,
    field,
  };
  quotes.insertOne(newQuote, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.ops[0]);
    }
  });
  res.json({
    message: 'New Quote Added',
  });
});

//?DELETE /quotes/:id - This endpoint allows users to delete a quote from the database using its ID. It can be helpful if you want to provide functionality for removing quotes that are no longer relevant or deemed inappropriate.

//?PUT /quotes/:id - This endpoint enables users to update an existing quote by its ID. It can be useful if you want to allow users or administrators to edit the content, author, or other details of a quote.

//?GET /quotes/search?q=searchTerm - This endpoint allows users to search for quotes based on a specific keyword or search term. It can be useful for users who want to find quotes related to a particular topic or theme.

//?GET /quotes/random?count=n - This endpoint fetches a specified number (n) of random quotes from your database. It can be used for displaying a set of random quotes on a website, app, or for any scenario where users would like to discover multiple random quotes at once.
