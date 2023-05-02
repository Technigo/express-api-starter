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

// get all books 
app.get("/books", (request, response) => {
  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      books: booksData
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
