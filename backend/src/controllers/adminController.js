const bookModel = require('../models/booksModel');

exports.addBook = async (req , res) =>{
    const {title,author,price,cover_url,description,genres} = req.body;
    console.log(req.body,"add book req");
    console.log("List",genres)
    const priceFloat = parseFloat(price);
    try{
        const newBook = await bookModel.addBook({title,author,priceFloat,cover_url,description});
        console.log("new Book from controller",newBook);
        await bookModel.addBookGenres(newBook.id,genres);
        res.status(201).json({message:"Book Added Successfully",book:newBook});
    }catch(err){
        res.status(500).json({message:"Error Adding Book",error:err.message});
    }

}