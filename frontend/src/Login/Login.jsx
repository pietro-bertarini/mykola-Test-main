import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { Web3Status } from '../components/Web3Components';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // We don't need to get wallet context here anymore since Web3Status handles it

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
          <button type="button" onClick={handleRegisterRedirect} className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
        </div>
        
        {error && <p className={styles.error}>{error}</p>}
        
        {/* MetaMask Section - Using the reusable Web3Status component */}
        <div className={styles.metamaskSection}>
          <div className={styles.divider}>
            <span>OR</span>
          </div>
          
          <Web3Status className={styles.web3Status} />
        </div>
      </form>
    </div>
  );
};

// Add prop validation
Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
