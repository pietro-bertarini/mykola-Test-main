import { useState } from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '../contexts/WalletContext';
import { MetaMaskLogo, ClipboardIcon } from './icons/Icons';
import '../styles/forms.css';

/**
 * Web3Status component for login page
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS class to apply to the component
 * @returns {JSX.Element} Web3Status component
 */
const Web3Status = ({ className = '' }) => {
  const { walletAddress, connectMetaMask, isMetaMaskInstalled, formatWalletAddress } = useWallet();
  const [copied, setCopied] = useState(false);
  
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
    <div className={className}>
      {!isMetaMaskInstalled ? (
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px' }}>
            MetaMask is not installed. Please install{' '}
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-blue)', fontWeight: 'bold', textDecoration: 'none' }}
            >
              MetaMask
            </a>
          </p>
        </div>
      ) : walletAddress ? (
        <div className="wallet-container">
          <div className="wallet-status">
            <div className="wallet-status-dot"></div>
            <span>Wallet Connected</span>
          </div>
          <div className="wallet-address">
            {formatWalletAddress(walletAddress)}
            <div style={{ position: 'relative', marginLeft: '8px' }}>
              <button 
                className="copy-button" 
                onClick={copyToClipboard} 
                aria-label="Copy wallet address"
                type="button"
              >
                <ClipboardIcon />
              </button>
              {copied && <span className="copied-tooltip">Copied!</span>}
            </div>
          </div>
        </div>
      ) : (
        <button 
          className="metamask-button" 
          onClick={handleConnect}
          type="button"
        >
          <MetaMaskLogo />
          <span style={{ marginLeft: '10px' }}>Connect with MetaMask</span>
        </button>
      )}
    </div>
  );
};

Web3Status.propTypes = {
  className: PropTypes.string
};

export default Web3Status; 