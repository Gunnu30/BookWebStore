import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const userName = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getFullCartData = async () => {
            try {
                // 1. Fetch Cart Items
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                const cartItems = data.data;
                console.log(cartItems)
                // // 2. Fetch Book Details for each item in the cart
                const detailedItems = await Promise.all(
                    cartItems.map(async (item) => {
                        const bookRes = await fetch(`${import.meta.env.VITE_API_URL}/books/${item.book_id}` , {method:"GET" , credentials:"include"});
                        const bookData = await bookRes.json();
                        console.log("book Data",bookData)
                        // Merge cart data with book details and calculate item total
                        return { 
                            ...item, 
                            title: bookData.title, 
                            cover_url: bookData.cover_url,
                            itemTotal: Number(item.price) * Number(item.quantity)
                        };
                    })
                );
                console.log("Detailed",detailedItems)
                setList(detailedItems);
            } catch (e) {
                console.log("Error fetching cart details:", e.message);
            } finally {
                setLoading(false);
            }
        };

        getFullCartData();
    }, []);

    // 3. Calculate Grand Total
    const grandTotal = list.reduce((acc, curr) => acc + curr.itemTotal, 0);

    if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Cart...</div>;

    const handleCheckout = () =>{
        navigate("/checkout", { state: { total: grandTotal } });
    }
    // ... existing imports and logic

    return (
        <div style={{ 
            padding: "20px", 
            maxWidth: "1200px", // Increased max-width for large screens
            margin: "0 auto",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1>{userName}'s Cart</h1>
            <hr />
            
            <ul style={{ listStyle: "none", padding: 0 }}>
                {list.map((each) => (
                    <li key={each.id} className="cart-item" style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ddd",
                        padding: "20px 0",
                        gap: "20px"
                    }}>
                        {/* Book Image & Title Section */}
                        <div style={{ display: "flex", alignItems: "center", gap: "clamp(15px, 4vw, 40px)", flex: 2 }}>
                            <img 
                                src={each.cover_url} 
                                alt={each.title} 
                                className="book-img"
                                style={{ 
                                    // Uses clamp: min 60px, preferred 10vw, max 150px
                                    width: "clamp(60px, 12vw, 150px)", 
                                    height: "auto", 
                                    aspectRatio: "3/4",
                                    objectFit: "cover", 
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                                }} 
                            />
                            <div>
                                <h1 style={{ 
                                    margin: 0, 
                                    fontSize: "clamp(16px, 2.5vw, 28px)" // Grows with screen
                                }}>
                                    {each.title}
                                </h1>
                                <p style={{ 
                                    color: "#008e5f", 
                                    fontSize: "clamp(14px, 1.5vw, 20px)",
                                    marginTop: "8px" 
                                }}>
                                    Price: ₹{each.price}
                                </p>
                            </div>
                        </div>

                        {/* Quantity & Item Total Section */}
                        <div style={{ textAlign: "right", flex: 1 }}>
                            <p style={{ margin: 0, fontSize: "clamp(14px, 1.8vw, 22px)" }}>
                                Qty: <strong>{each.quantity}</strong>
                            </p>
                            <p style={{ 
                                margin: "10px 0 0 0", 
                                fontWeight: "bold", 
                                color: "#47bada",
                                fontSize: "clamp(16px, 2vw, 26px)" 
                            }}>
                                Total: ₹{each.itemTotal.toFixed(2)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Grand Total Section */}
            {list.length > 0 ? (
                <div style={{ 
                    marginTop: "40px", 
                    textAlign: "right", 
                    padding: "30px", 
                    backgroundColor: "#171a3c", 
                    borderRadius: "12px",
                    border: "1px solid #eee"
                }}>
                    <h2 style={{ backgroundColor:"transparent", margin: 0, fontSize: "clamp(24px, 4vw, 42px)" }}>
                        Grand Total: <span style={{backgroundColor:"transparent", color: "#27ae60" }}>₹{grandTotal.toFixed(2)}</span>
                    </h2>
                    <button onClick={handleCheckout} style={{ 
                        marginTop: "20px", 
                        padding: "clamp(12px, 1.5vw, 20px) clamp(30px, 3vw, 60px)", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "8px", 
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "clamp(16px, 1.8vw, 22px)",
                        transition: "background 0.3s"
                    }}
                    className="bg-[#0984e3] hover:bg-[#2454f3]">
                        Proceed to Checkout
                    </button>
                </div>
            ) : (
                <p style={{ fontSize: "20px", textAlign: "center", marginTop: "50px" }}>Your cart is empty.</p>
            )}
        </div>
    );
//...
};

export default Cart;