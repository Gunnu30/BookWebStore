import { useDispatch } from "react-redux";
import { clearUser } from '../reduxSlices/userSlice';

const useLogoutService = () => {
    const dispatch = useDispatch();
    const api_url = import.meta.env.VITE_API_URL;

    // This is the actual function that will be called on click
    const logout = async () => {
        try {
            console.log("I am from Logout Service");
            const res = await fetch(`${api_url}/logout`, { 
                method: "POST", 
                credentials: "include" 
            });

            if (res.ok) {
                const data = await res.json(); // Don't forget to await res.json()
                alert(data.message || "Logged out successfully");
                dispatch(clearUser());
            } else {
                alert("Failed to Logout");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred during logout");
        }
    };

    // Return the function so the component can use it
    return logout; 
};

export default useLogoutService;