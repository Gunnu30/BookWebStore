import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const amount = location.state?.total || 0;

    const simulatePayment = async () => {
        setIsProcessing(true);

        const options = {
            // Vite requirement: must start with VITE_ in .env
            key: import.meta.env.VITE_RAZORPAY_KEY, 
            amount: amount * 100, 
            currency: "INR",
            name: "My Bookstore",
            description: "Order Checkout",
            handler: async function (response) {
                // 1. Success! Clear the cart in CockroachDB via Backend
                try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/confirm-payment`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            paymentId: response.razorpay_payment_id 
                        }),
                        credentials: "include"
                    });

                    if (res.ok) {
                        // 2. Redirect to tracking page with the Payment ID
                        navigate(`/track-order?id=${response.razorpay_payment_id}`);
                    } else {
                        alert("Payment successful, but failed to update database.");
                    }
                } catch (err) {
                    console.error("Post-payment error:", err);
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: "Sanjana Akshitha",
                email: "sanjana@example.com",
                contact: "9999999999"
            },
            theme: { color: "#0984e3" },
            modal: {
                ondismiss: function() {
                    setIsProcessing(false); // Re-enable button if user closes modal
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div style={{ textAlign: "center", padding: "100px", fontFamily: "Arial" }}>
            <h2>Confirm Your Purchase</h2>
            <div style={{ margin: "20px", padding: "20px", border: "1px solid #eee", borderRadius: "10px" }}>
                <p>Order Total: <strong style={{ fontSize: "24px" }}>₹{amount}</strong></p>
            </div>
            
            <button 
                onClick={simulatePayment}
                disabled={isProcessing || amount === 0}
                style={{
                    padding: "15px 40px",
                    backgroundColor: isProcessing ? "#ccc" : "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "18px",
                    cursor: isProcessing ? "not-allowed" : "pointer"
                }}
            >
                {isProcessing ? "Opening Secure Gateway..." : "Pay Now"}
            </button>
        </div>
    );
};

export default Checkout;