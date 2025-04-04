import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useWallet } from '../contexts/WalletContext';
import '../styles/variables.css';
import '../styles/forms.css';
import { MetaMaskLogo, ClipboardIcon } from '../components/icons/Icons';

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
              LOGIN
            </button>

            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="secondary-button"
            >
              REGISTER
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
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
            <div className="wallet-container">
              <div className="wallet-status">
                <div className="wallet-status-dot"></div>
                <span style={{ color: "var(--color-accent-green-main)", fontSize: "14px", fontFamily: "monospace" }}>Wallet Connected</span>
              </div>
              <div className="wallet-address">
                {formatWalletAddress(walletAddress)}
                <button
                  onClick={copyToClipboard}
                  className="copy-button"
                  aria-label="Copy wallet address"
                >
                  <ClipboardIcon />
                </button>
                {copied && <span className="copied-tooltip">Copied!</span>}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              className="metamask-button"
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
