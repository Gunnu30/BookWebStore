import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setBookToCart } from "../../reduxSlices/cartSlice"; 
import './books.css';

const BookItems = () => {
    const theme = useSelector((state) => state.theme.theme);
    const cartItems = useSelector((state) => state?.cart?.items || []); 
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const bookData = location.state?.fullBookData;

    const existingItem = cartItems?.find(item => item.id === bookData?.id);
    const [quantity, setQuantity] = useState(existingItem ? existingItem.quantity : 1);
    const [loading, setLoading] = useState(false);

    if (!bookData) {
        return (
            <div className={`error-screen ${theme}`}>
                <p>No book data found.</p>
                <button onClick={() => navigate('/')} className="store-btn">Go to Store</button>
            </div>
        );
    }

    const { id, title, price, description, author, cover_url, stock_count } = bookData;
    const inStock = stock_count > 0;
    const handleAddToCart = async () => {
        setLoading(true);
        
        // Update Redux
        
        try{
            await fetch(`${import.meta.env.VITE_API_URL}/add-to-cart`,
                {method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({id, quantity, price}),
                }
            )
            console.log({id,quantity,title,price,cover_url})
            dispatch(setBookToCart({ id, quantity, title, price, cover_url }));
            navigate('/cart')            
        }catch(e){
            console.log("Error Occured",e)
        }

        
    };

    return (
        <div className={`page-wrapper ${theme}`}>
            <nav className="top-nav">
                <button onClick={() => navigate(-1)} className="flex items-center hover:text-[#f93535]">
                    <ArrowLeft size={20} /> 
                    <span>Back</span>
                </button>
            </nav>

            <main className="book-details-container">
                <div className="image-section">
                    <img src={cover_url} alt={title} className="book-cover" />
                </div>

                <div className="info-section">
                    <h1 className="book-title">{title}</h1>
                    <p className="book-author">By {author}</p>
                    
                    <div className="price-stock-row">
                        <div className="price-tag">
                            <span className="currency">₹</span>{price}
                        </div>
                        <div className="stock-status">
                            {inStock ? (
                                <span className="stock-count">Only {stock_count} left</span>
                            ) : (
                                <span className="out-of-stock">Out Of Stock</span>
                            )}
                        </div>
                    </div>

                    <p className="book-description">{description}</p>

                    <div className="action-row">
                        <div className="qty-wrapper">
                            <label className="label">Quantity</label>
                            <select 
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                disabled={!inStock}
                                className="qty-select"
                            >
                                {[...Array(Math.min(stock_count, 10))].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            onClick={handleAddToCart}
                            disabled={!inStock || loading}
                            className="add-to-cart-btn"
                        >
                            {loading ? <Loader2 className="spinner" /> : <ShoppingCart className="bg-transparent" size={20} />}
                            {existingItem ? "Update & View Cart" : "Add to Cart"}
                        </button>

                        <button className="wishlist-btn">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookItems;