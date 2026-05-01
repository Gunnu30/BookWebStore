const express = require("express");

const routes = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const booksController = require("../controllers/booksController")

routes.get('/books',authMiddleware,booksController.booksList);

routes.get('/books/:id' , authMiddleware,booksController.getById);

routes.get('/books-genre/:genreId' , authMiddleware,booksController.allGenres);


module.exports = routes