import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useWallet } from '../main';

const MetaMaskLogo = () => (
  <svg width="24" height="24" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.1495 1L18.5163 10.1508L20.7551 4.82982L31.1495 1Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.83966 1L14.3919 10.2341L12.2453 4.82982L1.83966 1Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26.7308 22.0064L23.4978 27.0024L30.5656 28.9366L32.5831 22.1313L26.7308 22.0064Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.42749 22.1313L2.43372 28.9366L9.50153 27.0024L6.26857 22.0064L0.42749 22.1313Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.14587 13.5446L7.19092 16.4787L14.2004 16.8116L13.9508 9.27759L9.14587 13.5446Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.8435 13.5446L18.9552 9.19434L18.5163 16.8116L25.5093 16.4787L23.8435 13.5446Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.50153 27.0024L13.7427 24.9849L10.0835 22.1729L9.50153 27.0024Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.2573 24.9849L23.4985 27.0024L22.9165 22.1729L19.2573 24.9849Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.4985 27.0024L19.2573 24.9849L19.591 27.6684L19.5493 28.8533L23.4985 27.0024Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.50153 27.0024L13.4507 28.8533L13.4173 27.6684L13.7427 24.9849L9.50153 27.0024Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5182 20.3611L9.97925 19.3427L12.5281 18.2412L13.5182 20.3611Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4819 20.3611L20.472 18.2412L23.0209 19.3427L19.4819 20.3611Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.50153 27.0024L10.1252 22.0064L6.26857 22.1313L9.50153 27.0024Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.8748 22.0064L23.4985 27.0024L26.7315 22.1313L22.8748 22.0064Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.5093 16.4787L18.5163 16.8116L19.4819 20.3611L20.472 18.2412L23.0209 19.3427L25.5093 16.4787Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.97925 19.3427L12.5281 18.2412L13.5182 20.3611L14.4839 16.8116L7.49084 16.4787L9.97925 19.3427Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.49084 16.4787L10.0835 22.1729L9.97925 19.3427L7.49084 16.4787Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.0209 19.3427L22.9166 22.1729L25.5093 16.4787L23.0209 19.3427Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.4839 16.8116L13.5183 20.3611L14.6924 24.6283L15.1731 19.1762L14.4839 16.8116Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5163 16.8116L17.8354 19.1345L18.3077 24.6283L19.4818 20.3611L18.5163 16.8116Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4818 20.3611L18.3077 24.6283L19.2568 24.9849L22.9159 22.1729L23.0202 19.3427L19.4818 20.3611Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.97925 19.3427L10.0835 22.1729L13.7427 24.9849L14.6917 24.6283L13.5183 20.3611L9.97925 19.3427Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5493 28.8533L19.591 27.6684L19.2818 27.3938H13.7183L13.4174 27.6684L13.4507 28.8533L9.50153 27.0024L10.7698 28.0294L13.677 30H19.323L22.2302 28.0294L23.4985 27.0024L19.5493 28.8533Z" fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.2573 24.9849L18.3083 24.6283H14.6917L13.7427 24.9849L13.4173 27.6684L13.7183 27.3938H19.2818L19.591 27.6684L19.2573 24.9849Z" fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31.7315 10.6925L32.7633 5.61302L31.1492 1L19.2573 9.7841L23.8435 13.5446L30.3994 15.4372L31.8301 13.7962L31.2064 13.3383L32.224 12.4226L31.4765 11.8172L32.4941 11.0599L31.7315 10.6925Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.236816 5.61302L1.26862 10.6925L0.50602 11.0599L1.5236 11.8172L0.776 12.4226L1.79359 13.3383L1.16991 13.7962L2.60067 15.4372L9.14588 13.5446L13.7321 9.7841L1.84023 1L0.236816 5.61302Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30.3995 15.4372L23.8436 13.5446L25.5094 16.4787L22.9167 22.1729L26.7316 22.1313H32.5833L30.3995 15.4372Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.14587 13.5446L2.59 15.4372L0.42749 22.1313H6.26857L10.0835 22.1729L7.49084 16.4787L9.14587 13.5446Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5163 16.8116L19.2573 9.7841L21.2802 4.82983H11.7198L13.7427 9.7841L14.4837 16.8116L14.6917 19.1766L14.7001 24.6284H18.3167L18.325 19.1766L18.5163 16.8116Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { walletAddress, connectMetaMask, isMetaMaskInstalled, formatWalletAddress } = useWallet();
  const [copied, setCopied] = useState(false);

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
    await connectMetaMask();
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
              LOGIN
            </button>

            <button
              type="button"
              onClick={handleRegisterRedirect}
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
              REGISTER
            </button>
          </div>

          {error && <div style={{
            color: "#e53935",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "rgba(229, 57, 53, 0.1)",
            borderRadius: "5px",
            fontFamily: "monospace"
          }}>{error}</div>}

          <div style={{ display: "flex", alignItems: "center", margin: "25px 0" }}>
            <div style={{ flex: "1", height: "1px", background: "linear-gradient(to right, transparent, #ffcc00, transparent)" }}></div>
            <span style={{ padding: "0 15px", color: "#ffcc00", fontFamily: "Orbitron, sans-serif" }}>OR</span>
            <div style={{ flex: "1", height: "1px", background: "linear-gradient(to right, transparent, #ffcc00, transparent)" }}></div>
          </div>

          {!isMetaMaskInstalled ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ color: "white", fontFamily: "monospace" }}>
                MetaMask is not installed. Please install{' '}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffcc00", textDecoration: "none", borderBottom: "1px dotted #ffcc00" }}
                >
                  MetaMask
                </a>
              </p>
            </div>
          ) : walletAddress ? (
            <div style={{
              border: "1px solid #ffcc00",
              borderRadius: "8px",
              padding: "15px",
              marginTop: "15px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 204, 0, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ width: "10px", height: "10px", backgroundColor: "#4cd964", borderRadius: "50%", marginRight: "8px" }}></div>
                <span style={{ color: "#4cd964", fontSize: "14px", fontFamily: "monospace" }}>Wallet Connected</span>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                padding: "12px",
                borderRadius: "5px",
                fontFamily: "monospace",
                position: "relative"
              }}>
                {formatWalletAddress(walletAddress)}
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "#ffcc00",
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
                color: "white",
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
            color: "#ffcc00",
            fontFamily: "Orbitron, sans-serif",
            marginBottom: "8px",
            fontSize: "18px",
            textShadow: "0 0 8px rgba(255, 204, 0, 0.5)"
          }}>
             Memory Card
          </p>
          <p style={{ color: "#e0e0e0", fontSize: "14px", fontFamily: "monospace" }}>Connect your wallet or login to play!</p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
