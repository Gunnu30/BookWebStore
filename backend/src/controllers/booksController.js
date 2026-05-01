const booksModel = require('../models/booksModel');

exports.booksList = async (req, res) => {
    try {
        const listOfBooks = await booksModel.getAll();
        // Good practice: return the array directly or in a clear object
        return res.status(200).json({ listBooks: listOfBooks });
    } catch (e) {
        return res.status(500).json({ message: "Error While Retrieving Books" });
    }
};



exports.getById = async (req, res) => {
    const { id } = req.params;
    console.log("id",id)
    try {
        const data = await booksModel.getBookById(id);
        
        // Add this check!
        if (!data) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(data);
    } catch (e) {
        console.error("Error in getById controller:", e.message);
        return res.status(500).json({ message: "Error while retrieving book by Id" });
    }
};


exports.allGenres = async (req, res) => {
  const { genreId } = req.params;
  try {
    const data = await booksModel.getAllGenres(genreId);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No books found for this genre" });
    }
    res.json({ listBooks: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};
