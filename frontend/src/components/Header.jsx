import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import '../styles/forms.css';

/**
 * Simple header component that matches the style in the screenshots
 */
const Header = () => {
  const navigate = useNavigate();
  const { walletAddress, disconnectWallet } = useWallet();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    
    // Disconnect wallet if connected
    if (walletAddress) {
      disconnectWallet();
    }
    
    navigate('/login');
  };

  const navigateToPlay = () => {
    navigate('/play');
  };

  // If user is not logged in, don't show the header
  if (!isLoggedIn) return null;

  return (
    <header className="game-header">
      <div className="header-content">
        <div className="header-logo" onClick={navigateToPlay}>
          <span className="pixel-text">Wonder Cards</span>
        </div>
        
        <div className="header-actions">
          {walletAddress && (
            <div style={{ 
              marginRight: '16px', 
              fontFamily: 'monospace',
              color: 'var(--color-accent-yellow)'
            }}>
              Playing with wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </div>
          )}
          
          <button 
            className="logout-button" 
            onClick={handleLogout}
            type="button"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 