import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxSlices/userSlice";

const useAuthHydration = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Start a timer for 5 seconds
      try {
        // 2. Do the real auth check
        const res = await fetch(`${apiUrl}/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.username) {
            dispatch(setUser({username:data.username,role:data.role}));
          }
        } else {
          dispatch(setUser(null));
        }
      } catch (e) {
        console.error("Auth Hydration Error:", e);
        dispatch(setUser(null));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, apiUrl]);

  return { isLoading };
};

export default useAuthHydration;
