const express = require('express');
const cors = require('cors');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const app = express();

// CORS is enabled for all origins
app.use(cors());
// Connecting to database
const MongoClient = require('mongodb').MongoClient;

const readData = async () => {
  const client = new MongoClient(URI, { useNewUrlParser: true });

  try {
    await client.connect();

    const database = client.db('Quote');
    const collection = database.collection('quotes');

    // Reading data using the find() method
    const cursor = collection.find();
    const documents = await cursor.toArray();
    // console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error occurred while reading data:', error);
  } finally {
    // Close the client connection
    client.close();
  }
};

app.get('/', (request, response) => {
  response.send(
    '<h1>Hi this is simple API - HIT /quotes for getting all quotes available on server. Have a nice day <3 .¸</h1>'
  );
});

// Call the function to read data
app.get('/quotes', async (request, response) => {
  const data = await readData();
  response.json(data);
});
app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
