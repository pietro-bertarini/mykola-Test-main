import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useWallet } from '../main';
import '../styles/variables.css';
import { MetaMaskLogo } from '../components/Web3Components';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { walletAddress, connectMetaMask, disconnectWallet, isMetaMaskInstalled, formatWalletAddress } = useWallet();
  const [copied, setCopied] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      disconnectWallet();
      setInitialLoad(false);
    }
  }, [disconnectWallet, initialLoad]);

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

  const copyToClipboard = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Could not copy wallet address: ', err);
      });
  };

  const handleConnect = async () => {
    setInitialLoad(false);
    await connectMetaMask();
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
              style={{ 
                width: "100%", 
                padding: "15px 20px", 
                boxSizing: "border-box",
                backgroundColor: "var(--color-background-transparent)", 
                border: "1px solid rgba(255, 204, 0, 0.5)", 
                borderRadius: "5px", 
                color: "var(--color-text-primary)",
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
                backgroundColor: "var(--color-background-transparent)", 
                border: "1px solid rgba(255, 204, 0, 0.5)", 
                borderRadius: "5px", 
                color: "var(--color-text-primary)",
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
                background: `linear-gradient(90deg, var(--color-accent-yellow), var(--color-accent-yellow-light))`,
                color: "#121220",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Orbitron, sans-serif",
                transition: "all 0.3s ease",
                boxShadow: `0 0 10px var(--color-shadow-light)`
              }}
            >
              LOGIN
            </button>

            <button
              type="button"
              onClick={handleRegisterRedirect}
              style={{
                flex: "1",
                padding: "12px",
                backgroundColor: "transparent",
                color: "var(--color-accent-yellow)",
                border: `2px solid var(--color-accent-yellow)`,
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Orbitron, sans-serif",
                transition: "all 0.3s ease"
              }}
            >
              REGISTER
            </button>
          </div>

          {error && <div style={{
            color: "var(--color-accent-red-main)",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "rgba(229, 57, 53, 0.1)",
            borderRadius: "5px",
            fontFamily: "monospace"
          }}>{error}</div>}

          <div style={{ display: "flex", alignItems: "center", margin: "25px 0" }}>
            <div style={{ flex: "1", height: "1px", background: `linear-gradient(to right, transparent, var(--color-accent-yellow), transparent)` }}></div>
            <span style={{ padding: "0 15px", color: "var(--color-accent-yellow)", fontFamily: "Orbitron, sans-serif" }}>OR</span>
            <div style={{ flex: "1", height: "1px", background: `linear-gradient(to right, transparent, var(--color-accent-yellow), transparent)` }}></div>
          </div>

          {!isMetaMaskInstalled ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ color: "var(--color-text-primary)", fontFamily: "monospace" }}>
                MetaMask is not installed. Please install{' '}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent-yellow)", textDecoration: "none", borderBottom: `1px dotted var(--color-accent-yellow)` }}
                >
                  MetaMask
                </a>
              </p>
            </div>
          ) : walletAddress ? (
            <div style={{
              border: `1px solid var(--color-accent-yellow)`,
              borderRadius: "8px",
              padding: "15px",
              marginTop: "15px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 204, 0, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ width: "10px", height: "10px", backgroundColor: "var(--color-accent-green-main)", borderRadius: "50%", marginRight: "8px" }}></div>
                <span style={{ color: "var(--color-accent-green-main)", fontSize: "14px", fontFamily: "monospace" }}>Wallet Connected</span>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--color-background-transparent)",
                padding: "12px",
                borderRadius: "5px",
                fontFamily: "monospace",
                position: "relative",
                color: "var(--color-accent-yellow)"
              }}>
                {formatWalletAddress(walletAddress)}
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "var(--color-accent-yellow)",
                    fontSize: "18px"
                  }}
                >
                  📋
                </button>
                {copied && <span style={{
                  position: "absolute",
                  top: "-25px",
                  right: "10px",
                  backgroundColor: "rgba(0,0,0,0.8)",
                  padding: "4px 8px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  animation: "fadeIn 0.3s"
                }}>Copied!</span>}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px",
                backgroundColor: "#f6851b",
                color: "var(--color-text-primary)",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "15px",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "15px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(246, 133, 27, 0.4)"
              }}
            >
              <MetaMaskLogo />
              <span style={{ marginLeft: "10px" }}>Connect with MetaMask</span>
            </button>
          )}
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{
            color: "var(--color-accent-yellow)",
            fontFamily: "Orbitron, sans-serif",
            marginBottom: "8px",
            fontSize: "18px",
            textShadow: `0 0 8px var(--color-shadow-light)`
          }}>
            Card Memory Game
          </p>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", fontFamily: "monospace" }}>Connect your wallet or login to play!</p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
