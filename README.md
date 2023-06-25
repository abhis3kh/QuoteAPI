# Awesome Quote API

This repository contains the code for an awesome Quote API built with Express and MongoDB. The API allows you to fetch random quotes, filter quotes by field, and retrieve all quotes present in the database. It provides an intuitive way to access and manage a collection of inspiring quotes.

## Prerequisites

Before running the API, ensure you have the following:

- Node.js installed
- MongoDB database connection URI
- Environment variables properly set up (`.env` file)

## Getting Started

To get started with the Quote API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quote-api.git
   ```

2. Install the dependencies:

   ```bash
   cd quote-api
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory of the project and define the following variable:

   ```
   MONGODB_URI=<your_mongodb_connection_uri>
   ```

4. Run the application:

   ```
   npm start
   ```

The server will start listening on port 3000, and you'll see a message indicating the successful start of the server.

## Endpoints

The Quote API provides the following endpoints:

- **GET /quote**: Fetches a random quote.
- **GET /quote/:field**: Fetches a random quote based on the specified field.
- **GET /quotes**: Fetches all quotes present in the database.
- **GET /quotes/:field**: Fetches all quotes that correspond to the specified field.

- **POST /quote**: Creates a quote in the database.

## Usage

### Fetch a Random Quote

Send a GET request to `/quote` to receive a random quote as the response. Each time you hit this endpoint, a different random quote will be returned.

### Fetch a Random Quote by Field

Send a GET request to `/quote/:field`, where `:field` represents the field value (e.g., `motivational`, `wisdom`, etc.). The API will return a random quote that corresponds to the specified field.

### Fetch All Quotes

Send a GET request to `/quotes` to retrieve all quotes present in the database. The API will respond with an array of all quotes.

### Fetch All Quotes by Field

Send a GET request to `/quotes/:field`, where `:field` represents the field value (e.g., `motivational`, `wisdom`, etc.). The API will return an array of all quotes that correspond to the specified field.

### Creates a new Quote

Send a POST request to `/quotes` with below input and it will create the document in MongoDB. If sucess will throw an message "New Quote added".

#### Required Parameters :

```
{
"quote": "Example quote",
"quotedBy": "John Doe",
"field": "Example field"
}
```

## Contribution

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request. Ensure that your changes align with the existing code style and that tests pass successfully.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for personal or commercial purposes.
