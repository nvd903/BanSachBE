const mongoose = require("mongoose");
const Book = require("../model/bookSchema");
const Genre = require("../model/genreSchema");
const Author = require("../model/authorSchema");

class BookController {
  async createOne(req, res) {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      if (req.body.author) {
        const author = await Author.findById(req.body.author);
        if (author && !author.books.includes(newBook._id)) {
          await author.updateOne({ $push: { books: savedBook._id } });
        } else {
          return res
            .status(401)
            .json("chưa có author hoặc đã có sách trong database");
        }
      }
      if (newBook.genres) {
        newBook.genres.map(async (genreId) => {
          const genre = await Genre.findById(genreId);
          if (genre && !genre.books.includes(newBook._id)) {
            await genre.updateOne({
              $push: { books: newBook._id },
            });
          } else {
            return res
              .status(401)
              .json("chưa có genre hoặc đã có sách trong database");
          }
        });
      }
      return res.status(200).json(savedBook);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllBook(req, res) {
    try {
      const allBooks = await Book.find().sort({ createdAt: -1 });

      return res.status(200).json(allBooks);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getBestSellerList(req, res) {
    try {
      const books = await Book.find().sort({ purchasedQuantity: -1 }).limit(5);
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getABookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        return res.status(200).json(book);
      }
      return res.status(404).json("not found the book");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getBooksLimit(req, res) {
    try {
      const perPage = req.query.perPage || 5;
      const page = req.query.page || 1;
      const totalBooks = await Book.countDocuments();
      const totalPages = Math.ceil(totalBooks / perPage);
      await Book.find()
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, books) => {
          if (err) res.status(404).json("falure");
          return res.status(200).json({ data: books, totalPages });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateABook(req, res) {
    try {
      const book = await Book.findById(req.body._id);
      if (book) {
        await book.updateOne({ $set: req.body });
        const savedBook = await book.save();
        return res.status(200).json(savedBook);
      }
      return res.status(404).json("not found");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async decrementQuantity(req, res) {
    try {
      const book = await Book.findById(req.body._id);
      if (!book) {
        return res.status(404).json("khong tim thay sach");
      }
      book.inventoryQuantity = book.inventoryQuantity - req.body.quantity;
      await book.save();
      return res.status(200).json("decrement quantity successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async incrementInventoryQuantity(req, res) {
    try {
      const book = await Book.findById(req.body._id);
      if (!book) {
        return res.status(404).json("khong tim thay sach");
      }
      book.inventoryQuantity = book.inventoryQuantity + req.body.quantity;
      await book.save();
      return res.status(200).json("increment inventory quantity successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updatePurchasedQuantity(req, res) {
    // body {_id,quanity, type: confirm order or cancel order}
    try {
      const book = await Book.findById(req.body._id);
      if (!book) {
        return res.status(404).json("khong tim thay sach");
      }
      if (req.body.type === "confirm order") {
        console.log("a");
        book.purchasedQuantity = book.purchasedQuantity + req.body.quantity;
        console.log("b");
      }

      if (req.body.type === "cancel order") {
        if (book.purchasedQuantity >= 0) {
          if (book.purchasedQuantity > req.body.quantity) {
            book.purchasedQuantity = book.purchasedQuantity - req.body.quantity;
          } else {
            book.purchasedQuantity = 0;
          }
        }
      }
      await book.save();
      return res.status(200).json("update purchased quantity successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteABook(req, res) {
    try {
      await Author.updateMany(
        { books: req.body._id },
        { $pull: { books: req.body._id } }
      );
      await Genre.updateMany(
        { books: req.body._id },
        { $pull: { books: req.body._id } }
      );
      await Book.findByIdAndDelete(req.body._id);
      return res.status(200).json("delete successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getListFavouriteBooks(req, res) {
    //body{perPage, page}
    try {
      const perPage = req.body.perPage || 20;
      const page = req.body.page || 1;
      // const totalBook = await Book.count();
      // const totalPages = Math.ceil((totalBook - 20) / 10 + 1);
      await Book.find()
        .sort({ priorityPoints: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)

        .exec((err, books) => {
          if (err) res.status(404).json("falure");
          return res
            .status(200)
            .json({ page: page, perPage: perPage, data: books });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updatePriorityPoints(req, res) {
    //body{type: "addtocart" || "order", authorId, genreId, bookId}
    try {
      if (req.body.type === "addtocart") {
        console.log("vao if", req.body.bookId);

        await Book.findByIdAndUpdate(
          req.body.bookId,
          {
            $inc: { priorityPoints: 5 },
          },
          { new: true }
        );
        console.log(" bookID ok");
        await Book.updateMany(
          { author: req.body.authorId },
          { $inc: { priorityPoints: 2 } }
        );
        console.log(" author ok");

        await Book.updateMany(
          { genres: { $in: req.body.genreId } },
          { $inc: { priorityPoints: 2 } }
        );
        console.log(" genres ok");
      }
      if (req.body.type === "order") {
        await Book.updateMany(
          { author: req.body.authorId },
          { $inc: { priorityPoints: 2 } }
        );
        await Book.updateMany(
          { genres: { $in: req.body.genreId } },
          { $inc: { priorityPoints: 2 } }
        );
        await Book.findByIdAndUpdate(req.body.bookId, {
          priorityPoints: 0,
        });
      }
      return res.status(200).json("Update successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateManyQuantity(req, res) {
    try {
      await Book.updateMany({}, { $set: { inventoryQuantity: 100 } });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new BookController();
