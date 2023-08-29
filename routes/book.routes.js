
const express = require('express');

const router = express.Router();
const Book = require('../models/Book.model');
const Author = require("../models/Author.model");
//GET /contact-me

// GET/books
router.get("/books", (req, res, next) => {

    Book.find()
    .populate("author")    
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

// CREATE: display form
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create");
});



// CREATE: process form
router.post("/books/create", (req, res, next) => {

    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    };

    Book.create(newBook)
        .then((newBook) => {
            res.redirect("/books");
        })
        .catch(e => {
            console.log("error creating new book", e);
            next(e);
        });
});

// UPDATE: display form
router.get('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;

    Book.findById(bookId)
        .then(bookToEdit => {
            // console.log(bookToEdit);
            res.render('books/book-edit.hbs', { book: bookToEdit }); // <-- add this line
        })
        .catch(error => next(error));
});



// UPDATE: process form
router.post('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;
    const { title, description, author, rating } = req.body;

    Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
        .then(updatedBook => res.redirect(`/books/${updatedBook.id}`)) // go to the details page to see the updates
        .catch(error => next(error));
});



// DELETE: delete book
router.post('/books/:bookId/delete', (req, res, next) => {
    const { bookId } = req.params;

    Book.findByIdAndDelete(bookId)
        .then(() => res.redirect('/books'))
        .catch(error => next(error));
});



router.get('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId)
    .populate("author")  
    .then((bookById) => {
        res.render('books/book-details', bookById);
      })
      .catch(err => {console.log(`Error: ${err}`)});
  });


  module.exports = router;