const Book = require("../model/bookSchema");
const Author = require("../model/authorSchema");

class SearchController {
  // search
  async searchBook(req, res) {
    try {
      // xử lý bỏ khoảng trắng hai đầu và ở giữa các từ
      const keySearch = req.query.q.replace(/\s+/g, " ").trim();

      if (!keySearch) {
        return res.status(403).json("không key search");
      }

      let resultSearch = await Book.find({ name: { $regex: keySearch } })
        .limit(5)
        .sort({ priorityPoints: -1 });

      if (req.query.type === "books" && req.query.limit === "full") {
        resultSearch = await Book.find({ name: { $regex: keySearch } }).sort({
          priorityPoints: 1,
        });
      }

      if (req.query.type === "authors") {
        if (req.query.limit === "less") {
          resultSearch = await Author.find({
            name: { $regex: keySearch },
          }).limit(5);
        }
        if (req.query.limit === "full") {
          resultSearch = await Author.find({ name: { $regex: keySearch } });
        }
      }

      if (resultSearch && resultSearch.length > 0) {
        res.status(200).json(resultSearch);
      } else {
        res.status(403).json("không có kết quả");
      }
    } catch (error) {
      res.status(500).json("sai: ");
    }
  }
}

module.exports = new SearchController();
