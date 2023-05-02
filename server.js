import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello! please type");
  response.json(listEndpoints(app));
});

// get all books with optional average_rating filter
// http://localhost:8080/books?minRating=4.5

app.get("/books", (request, response) => {
  const minRating = parseFloat(request.query.minRating) || 0;
  const filteredBooks = booksData.filter((b) => b.average_rating >= minRating);

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      books: filteredBooks
    }
  });
});



// books by author
app.get("/books/author/:author", (request, response) => {
  const searchResults = booksData.filter((b) => b.authors.toLowerCase().includes(request.params.author.toLowerCase()));

  if (searchResults.length > 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        searchResults
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No books found matching the given author",
      body: {}
    });
  }
});


// books by id

app.get("/books/:id", (request, response) => {
  const book = booksData.find((b) => b.bookID === Number(request.params.id));

  if (book) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      description: "Use route /books for available books",
      body: {}
    });
  }
});


// get the top 10 suggested books
app.get("/suggest-books", (request, response) => {
  if (booksData.length > 0) {
    const sortedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating);
    const topTenBooks = sortedBooks.slice(0, 10);

    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        topTenBooks
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No books available",
      body: {}
    });
  }
});

// Dummy endpoint to search books by genre
app.get("/books/genre/:genre", (request, response) => {
  response.status(501).json({
    success: false,
    message: "Not Implemented",
    description: "This endpoint is not yet implemented",
    body: {}
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
