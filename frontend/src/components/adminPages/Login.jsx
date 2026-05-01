import '../userPages/authFile.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reduxSlices/userSlice';

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if(!email || !password) {
        alert("All fields are required!"); // Or use a state-based error message
        return; // Stop the function here
    }

    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ⚠️ ESSENTIAL: This allows the browser to receive and store the HttpOnly cookie
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      // ✅ SUCCESS: The cookie is now stored by the browser automatically.
      // We only update Redux with non-sensitive user info.
      console.log(data.role)
      dispatch(setUser({ username: data.username,role:data.role }));

      alert('Login successful!');
      navigate("/admin/dashboard");
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-card" style={{ maxWidth: '450px' }}>
        <h2 className="form-title">Welcome Back</h2>
        
        <form onSubmit={onSubmitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              placeholder="Password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </span>
          </div>

          <button type="submit">Sign In</button>
        </form>

        <p style={{ color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>
          Haven't an account? <Link to="/admin/register" className="login-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;