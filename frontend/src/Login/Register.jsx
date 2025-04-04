import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      background: "radial-gradient(circle, #1e1e2e 0%, #121220 100%)",
      backgroundImage: "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2070')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay"
    }}>
      <div style={{ 
        maxWidth: "500px", 
        width: "90%", 
        padding: "40px", 
        backgroundColor: "rgba(30, 30, 46, 0.9)", 
        backdropFilter: "blur(10px)",
        border: "2px solid #ffcc00", 
        borderRadius: "15px",
        boxShadow: "0 0 30px rgba(255, 204, 0, 0.3), 0 0 100px rgba(0, 0, 0, 0.5)"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "30px", 
          fontFamily: "Orbitron, sans-serif", 
          fontSize: "42px",
          color: "#ffcc00", 
          textShadow: "0 0 10px #ffcc00, 0 0 20px rgba(255, 204, 0, 0.5)",
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
              style={{ 
                width: "100%", 
                padding: "15px 20px", 
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.3)", 
                border: "1px solid rgba(255, 204, 0, 0.5)", 
                borderRadius: "5px", 
                color: "white",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                fontFamily: "monospace"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ 
                width: "100%", 
                padding: "15px 20px", 
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.3)", 
                border: "1px solid rgba(255, 204, 0, 0.5)", 
                borderRadius: "5px", 
                color: "white",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                fontFamily: "monospace"
              }}
              required
            />
          </div>
          
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <button
              type="submit"
              style={{ 
                flex: "1",
                padding: "12px",
                background: "linear-gradient(90deg, #ffcc00, #ffaa00)",
                color: "#121220",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Orbitron, sans-serif",
                transition: "all 0.3s ease",
                boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)"
              }}
            >
              REGISTER
            </button>
            
            <button
              type="button"
              onClick={handleLoginRedirect}
              style={{ 
                flex: "1",
                padding: "12px",
                backgroundColor: "transparent",
                color: "#ffcc00",
                border: "2px solid #ffcc00",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Orbitron, sans-serif",
                transition: "all 0.3s ease"
              }}
            >
              BACK TO LOGIN
            </button>
          </div>
          
          {message && (
            <div style={{ 
              color: "#4cd964", 
              padding: "15px", 
              backgroundColor: "rgba(76, 217, 100, 0.1)", 
              marginTop: "20px", 
              borderRadius: "5px",
              border: "1px solid rgba(76, 217, 100, 0.3)",
              fontFamily: "monospace"
            }}>
              <p>{message}</p>
              <p style={{ fontSize: "14px", opacity: "0.8" }}>Redirecting to login...</p>
            </div>
          )}
          
          {error && <div style={{ 
            color: "#e53935", 
            marginBottom: "15px", 
            padding: "10px", 
            backgroundColor: "rgba(229, 57, 53, 0.1)", 
            borderRadius: "5px",
            border: "1px solid rgba(229, 57, 53, 0.3)",
            fontFamily: "monospace"
          }}>{error}</div>}
        </form>
        
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ 
            color: "#ffcc00", 
            fontFamily: "Orbitron, sans-serif", 
            marginBottom: "8px",
            fontSize: "18px",
            textShadow: "0 0 8px rgba(255, 204, 0, 0.5)" 
          }}>
            Join the Adventure
          </p>
          <p style={{ color: "#e0e0e0", fontSize: "14px", fontFamily: "monospace" }}>Create an account to save your progress!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
