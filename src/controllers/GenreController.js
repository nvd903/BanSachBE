const mongoose = require("mongoose");

const Genre = require("../model/genreSchema");
const Book = require("../model/bookSchema");

class GenreController {
  async createOne(req, res) {
    try {
      const newGenre = new Genre(req.body);
      const saveGenre = await newGenre.save();
      res.status(200).json(saveGenre);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const genres = await Genre.find();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  /*
  truyền page ki
  */
  async getPage(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 5;
      const totalGenre = await Genre.countDocuments();
      const totalPages = Math.ceil(totalGenre / perPage);
      if (page > totalPages) {
        res.status(403).json("the page does not exist");
      }
      const genres = await Genre.find({})
        .skip(perPage * page - perPage)
        .limit(perPage);
      if (genres) {
        res.status(200).json({
          data: genres,
          currentPage: page,
          totalGenre,
          totalPages,
        });
      }
      res.status(404).json("not found the genre");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const newGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!newGenre) {
        return res.status(404).json("not a genre yet");
      }

      res.status(200).json(newGenre);

      //làm như dưới bị sai nhưng không tìm ra lỗi
      // const genre = await Genre.findById(req.params.id);
      // if (genre) {
      //   const newGenre = await genre.updateOne(
      //     { _id: req.params.id },
      //     { $set: req.body }
      //   );

      //   res.status(200).json(newGenre);
      // }
      // res.status(404).json("not a genre yet");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await Book.updateMany(
        { genres: req.params.id },
        { $pull: { genres: req.params.id } }
      );
      const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedGenre);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new GenreController();
