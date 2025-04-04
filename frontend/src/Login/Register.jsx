import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/variables.css';
import '../styles/forms.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', formData);
      setMessage(response.data.message);
      
      // Set a success message and clear the form
      setFormData({ username: '', password: '' });
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data.message || 'Error registering');
    }
  };
  
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "radial-gradient(circle, var(--color-background-main) 0%, #121220 100%)",
      backgroundImage: "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2070')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay"
    }}>
      <div style={{ 
        maxWidth: "500px", 
        width: "90%", 
        padding: "40px", 
        backgroundColor: "var(--color-background-modal)", 
        backdropFilter: "blur(10px)",
        border: "2px solid var(--color-accent-yellow)", 
        borderRadius: "15px",
        boxShadow: `0 0 30px rgba(255, 204, 0, 0.3), 0 0 100px var(--color-shadow-dark)`
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "30px", 
          fontFamily: "Orbitron, sans-serif", 
          fontSize: "42px",
          color: "var(--color-accent-yellow)", 
          textShadow: "0 0 10px var(--color-accent-yellow), 0 0 20px var(--color-accent-yellow-light)",
          animation: "pulseTitle 3s infinite"
        }}>
          Wonder Cards
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="form-input"
              required
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-input"
              required
            />
          </div>
          
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <button
              type="submit"
              className="primary-button"
            >
              REGISTER
            </button>
            
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="secondary-button"
            >
              BACK TO LOGIN
            </button>
          </div>
          
          {message && (
            <div className="success-message">
              <p>{message}</p>
              <p style={{ fontSize: "14px", opacity: "0.8" }}>Redirecting to login...</p>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
        </form>
        
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ 
            color: "var(--color-accent-yellow)", 
            fontFamily: "Orbitron, sans-serif", 
            marginBottom: "8px",
            fontSize: "18px",
            textShadow: `0 0 8px var(--color-shadow-light)` 
          }}>
            Join the Adventure
          </p>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", fontFamily: "monospace" }}>Create an account to save your progress!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
