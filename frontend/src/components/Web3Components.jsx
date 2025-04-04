import { useState } from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '../main';
import styles from './Web3Components.module.css';

/**
 * Component to display the connected wallet address
 * @param {Object} props - Component props
 * @param {boolean} props.showCopyButton - Whether to show the copy button
 * @param {boolean} props.showStatus - Whether to show the connection status
 * @param {string} props.className - Additional CSS class to apply to the component
 * @returns {JSX.Element} Wallet Display component
 */
export const WalletDisplay = ({ showCopyButton = true, showStatus = true, className = '' }) => {
  const { walletAddress, formatWalletAddress } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e) => {
    // Prevent any default actions and stop event propagation
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

  if (!walletAddress) return null;

  return (
    <div className={`${styles.walletContainer} ${className}`}>
      {showStatus && (
        <div className={styles.walletStatus}>
          <div className={styles.walletStatusDot}></div>
          <span>Wallet Connected</span>
        </div>
      )}
      <p className={styles.walletAddress}>
        {formatWalletAddress(walletAddress)}
        {showCopyButton && (
          <div className={styles.copyButtonContainer}>
            <button 
              className={styles.copyButton} 
              onClick={copyToClipboard} 
              aria-label="Copy wallet address"
              type="button" // Explicitly set button type to prevent form submission
            >
              📋
            </button>
            {copied && <span className={styles.tooltip}>Copied!</span>}
          </div>
        )}
      </p>
    </div>
  );
};

WalletDisplay.propTypes = {
  showCopyButton: PropTypes.bool,
  showStatus: PropTypes.bool,
  className: PropTypes.string
};

/**
 * MetaMask Fox logo component
 * @returns {JSX.Element} MetaMask Logo SVG
 */
export const MetaMaskLogo = () => (
  <svg width="24" height="24" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.metamaskLogo}>
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

/**
 * Connect Wallet Button component
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Callback function to run after successful connection
 * @param {string} props.className - Additional CSS class to apply to the component
 * @returns {JSX.Element} Connect Wallet Button component
 */
export const ConnectWalletButton = ({ onSuccess, className = '' }) => {
  const { isConnecting, connectMetaMask, isMetaMaskInstalled } = useWallet();

  const handleConnect = async () => {
    await connectMetaMask();
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className={`${styles.metamaskMessage} ${className}`}>
        <p>
          MetaMask is not installed. Please install{' '}
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.metamaskLink}
          >
            MetaMask
          </a>
        </p>
      </div>
    );
  }

  return (
    <button 
      className={`${styles.connectButton} ${className}`} 
      onClick={handleConnect} 
      disabled={isConnecting}
      type="button" // Explicitly set button type to prevent form submission
    >
      <MetaMaskLogo />
      {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
    </button>
  );
};

ConnectWalletButton.propTypes = {
  onSuccess: PropTypes.func,
  className: PropTypes.string
};

/**
 * Web3Status component to show either connect button or wallet address based on connection state
 * @param {Object} props - Component props
 * @param {Function} props.onConnect - Callback function to run after successful connection
 * @param {string} props.className - Additional CSS class to apply to the component
 * @returns {JSX.Element} Web3Status component
 */
export const Web3Status = ({ onConnect, className = '' }) => {
  const { walletAddress } = useWallet();

  return (
    <div className={`${styles.web3StatusContainer} ${className}`}>
      {walletAddress ? (
        <WalletDisplay />
      ) : (
        <ConnectWalletButton onSuccess={onConnect} />
      )}
    </div>
  );
};

Web3Status.propTypes = {
  onConnect: PropTypes.func,
  className: PropTypes.string
};

export default {
  WalletDisplay,
  MetaMaskLogo,
  ConnectWalletButton,
  Web3Status
}; 