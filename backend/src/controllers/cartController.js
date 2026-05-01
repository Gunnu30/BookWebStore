const cartModel = require('../models/cartModel');


exports.cart = async (req, res) => {
    const userId = req.user.id
        console.log("user id" , userId)
    try {
        const { id, quantity, price} = req.body;
        const userId = req.user.id
        console.log("user id" , userId)
        const data = await cartModel.addToCart(userId,id,quantity,price);
        console.log(data)
        if(!data){
            return res.statue(404).json({message:"Error Occrured"});
        }
        return res.status(200).json({ message: "Successfully Added to Cart" , data });
    } catch (e) {
        console.error("Controller Error:", e);
        return res.status(500).json({ message: "Error While Adding books to Cart" });
    }
};
exports.cartItems = async (req,res) => {
    try{
        const itemsList = await cartModel.getCartItems();
        return res.status(200).json({data:itemsList});
    }catch(e){
        return res.status(500).json("Error while Calling DataBase");
    }
};

exports.confirmPayment = async (req,res)=>{
    const {paymentId} = req.body;
    const userId = req.user.id
    try{
        await cartModel.deleteByUserId(userId);
        return res.statue(200).json({success:true,trackingId:paymentId});
    }catch(e){
        return res.statue(500).json("Error while calling DataBase");
    }
}