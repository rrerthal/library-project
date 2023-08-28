
const express = require('express');

const router = express.Router();
const Book = require('../models/Book.model');
//GET /contact-me

// GET/books
router.get("/books", (req, res, next) => {

    Book.find()
        .then((booksFromDB) => {

            const data = {
                books: booksFromDB
            }

            res.render("books/books-list", data);

        })
        .catch(e => {
            console.log("error getting list of books from DB", e)
             next(e);
    });
});

router.post("/books/create", (req, res, next) => {

    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    };

    Book.create(newBook)
        .then( (newBook) => {
            res.redirect("/books");
        })
        .catch( e => {
            console.log("error creating new book", e);
            next(e);
        });
});



router.get('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId)
      .then((bookById) => {
        res.render('books/book-details', bookById);
      })
      .catch(err => {console.log(`Error: ${err}`)});
  });


  module.exports = router;