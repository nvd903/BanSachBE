const mongoose = require("mongoose");

const Author = require("../model/authorSchema");
const Book = require("../model/bookSchema");

class AuthorController {
  async createAnAuthor(req, res) {
    try {
      const newAuthor = await new Author(req.body);
      const savedAuthor = await newAuthor.save();
      return res.status(200).json(savedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllAuthor(req, res) {
    try {
      const allAuthors = await Author.find();
      return res.status(200).json(allAuthors);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAuthorPerPage(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perpage) || 5;
      const totalAuthors = await Author.countDocuments();
      const totalPages = Math.ceil(totalAuthors / perPage);
      const authors = await Author.find()
        .skip(perPage * (page - 1))
        .limit(perPage);
      if (!authors) {
        return res.status(404).json("not found authors");
      }
      return res.status(200).json({
        data: authors,
        currentPage: page,
        perPage,
        totalAuthors,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateAuthor(req, res) {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (updatedAuthor) {
        return res.status(200).json(updatedAuthor);
      }
      return res.status(404).json("not an author yet");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteAuthor(req, res) {
    try {
      await Book.updateMany(
        { author: req.params.id },
        { isAble: false, author: null }
      );
      const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedAuthor);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getById(req, res) {
    // id lấy từ params
    try {
      const id = req.params.id;
      const author = await Author.findById(id);
      if (!author) {
        return res.status(404).json("not found author yet");
      }
      return res.status(200).json(author);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new AuthorController();
