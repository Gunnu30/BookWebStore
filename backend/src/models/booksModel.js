const supabase = require('../config/db');
exports.addBook = async ({title, author, priceFloat, description, cover_url}) => {
    try {
        console.log("Model: Attempting to insert...", title);

        const {data,error} = await supabase
        .from("books")
        .insert({
            title:title,
            author:author,
            price:priceFloat,
            cover_url:cover_url,
            description:description
        });
        if(error)throw error;

        return data[0]; 

    } catch (err) {
        // THIS IS THE MOST IMPORTANT PART
        console.error("DATABASE ERROR in addBook model:", err.message);
        throw err; // Send the error back to the controller
    }
}

exports.addBookGenres = async (bookId,genres) =>{
    console.log("Adding genres for book ID:", bookId, "Genres:", genres);
    
    const len = genres.length;
  
    try{
        let res = []
        for(let i = 0;i<len;i++){

            const {genre_id , score} = genres[i];
            const {data ,error}= await supabase
            .from("book_genres")
            .insert({
                book_id:bookId,
                genre_id:genre_id,
                score:score
            });
            if(error)throw error;
            res.push(data[0]);
        }
        return res;
    }catch(err){
        console.log("error",err)
        throw err;
    }
}

exports.getAll = async () =>{
    try{
        const {data , error} = await supabase
        .from('books')
        .select("*");
        if(error)throw error;
        return data;
    }catch(e){
        console.log("Retriving All Books by models : " , e);
        throw e;
    }
}


exports.getBookById = async (id) =>{
    try{
        const {data,error} = await supabase
        .from("books")
        .select("title,author,cover_url")
        .eq("id",id)
        .maybeSingle();
        if(error)throw error;
        console.log(data);
        return data;
    }catch(e){
        console.error("Error",e.message);
        throw e;
    }
}
exports.getAllGenres = async (id) => {
    console.log("getAllGenres called with id:", id, "type:", typeof id);
  try {
    // Get all book_ids AND scores for this genre
    const { data: genreRows, error: genreError } = await supabase
      .from("book_genres")
      .select("book_id,score")
      .eq("genre_id", String(id));

    if (genreError) {
      console.error("Error in Step 1 (genreRows query):", genreError);
      throw genreError;
    }
    console.log("Step 1 - genreRows:", genreRows);

    if (!genreRows || genreRows.length === 0) {
      console.log(`No books found for genre ${id}`);
      return [];
    }

    const bookIds = genreRows
      .map((row) => row.book_id)
      .filter((bid) => bid !== null && bid !== undefined);
    
    // Create a map of bookId -> score for later attachment
    const scoreMap = {};
    genreRows.forEach((row) => {
      scoreMap[row.book_id] = row.score || 0;
    });
    
    console.log("Step 1 - Extracted bookIds:", bookIds, "count:", bookIds.length);

    if (bookIds.length === 0) {
      console.log("After filtering, no valid bookIds remain");
      return [];
    }

    const numericBookIds = bookIds.map((id) => 
      isNaN(id) ? id : Number(id)
    );
    console.log("Step 2 - Query with bookIds:", numericBookIds);

    const { data: books, error: booksError } = await supabase
      .from("books")
      .select("id,title,author,price,cover_url,description")
      .in("id", numericBookIds);

    if (booksError) {
      console.error("Error in Step 2 (books query):", booksError);
      throw booksError;
    }

    // Attach scores to each book
    const booksWithScore = (books || []).map((book) => ({
      ...book,
      relevanceScore: scoreMap[book.id] || 0
    }));

    console.log("Step 2 - Books fetched:", booksWithScore?.length, "books");
    console.log("Books data:", booksWithScore);

    return booksWithScore || [];
  } catch (e) {
    console.error("Supabase error in getAllGenres:", e.message, e);
    throw e;
  }
};
