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

            const {genre_id , genre , score} = genres[i];
            const {data ,error}= await supabase
            .from("book_genres")
            .insert({
                book_id:bookId,
                genre_id:genre_id,
                genre_name:genre,
                score:score
            });
            if(error)throw error;
            res.add(data[0]);
        }
        return res;
    }catch(err){
        console.log("error",err)
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
  try {
    const { data, error } = await supabase
      .from("book_genres")
      .select("*")
      .eq("genre_id", String(id));
    if (error) throw error;
    console.log(data)
    return data; // ✅ return the array
  } catch (e) {
    console.error("Supabase error:", e.message);
    throw e;
  }
};
