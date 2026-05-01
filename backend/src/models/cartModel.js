const supabase = require('../config/db');


exports.addToCart = async (userId, bookId, quantity, price) => {
    const { data, error } = await supabase
        .from("cart")
        .upsert(
            { user_id: String(userId), book_id: bookId, quantity, price },
            { onConflict: 'user_id, book_id' }
        )
        .select();

    if (error) throw error;
    return data[0];
};
exports.getCartItems = async () =>{
    const {data,error} = await supabase
    .from("cart")
    .select("*");
    if(error)throw error;
    console.log(data)
    return data;
}
exports.postPaymentId = async (id) =>{
    await supabase
    .from("cart")
    .delete()
    .eq(user_id,id);
    return;
}