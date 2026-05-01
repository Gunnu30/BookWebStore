const express = require("express");

const routes = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const booksController = require("../controllers/booksController")

routes.get('/books',authMiddleware,booksController.booksList);

routes.get('/books/:id' , authMiddleware,booksController.getById);

routes.get('/books-genre/:genreId' , authMiddleware,booksController.allGenres);

// Debug endpoint (remove in production)
routes.get('/debug/genre-books/:genreId', async (req, res) => {
  const supabase = require('../config/db');
  const { genreId } = req.params;
  
  try {
    console.log(`[DEBUG] Checking genre: ${genreId}`);
    
    // Raw query without filtering
    const { data: raw, error: rawError } = await supabase
      .from("book_genres")
      .select("*")
      .eq("genre_id", String(genreId));
    
    console.log(`[DEBUG] Raw book_genres rows:`, raw);
    
    if (raw && raw.length > 0) {
      const ids = raw.map(r => r.book_id);
      console.log(`[DEBUG] Book IDs found:`, ids);
      
      // Check if these books exist
      const { data: foundBooks, error: booksError } = await supabase
        .from("books")
        .select("*")
        .in("id", ids);
      
      console.log(`[DEBUG] Books found:`, foundBooks);
      
      return res.json({ 
        genreId, 
        book_genres_count: raw.length,
        book_genres: raw,
        books_found: foundBooks?.length || 0,
        books: foundBooks 
      });
    }
    
    return res.json({ 
      genreId, 
      book_genres_count: 0, 
      book_genres: [],
      books: [] 
    });
    
  } catch (e) {
    console.error(`[DEBUG ERROR]:`, e.message);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = routes