import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Wallet Context
const WalletContext = createContext(null);

// Hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Wallet Provider Component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if MetaMask is installed on component mount
  useEffect(() => {
    const checkMetaMaskInstallation = () => {
      if (window.ethereum) {
        setIsMetaMaskInstalled(true);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
        
        // Check if already connected
        checkIfConnected();
      }
    };

    checkMetaMaskInstallation();
    
    // Retrieve wallet address from localStorage if it exists
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
    
    // Cleanup listeners on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  
  // Check if already connected to MetaMask
  const checkIfConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking if connected:', error);
    }
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setWalletAddress('');
      localStorage.removeItem('walletAddress');
    } else {
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    }
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  // Format wallet address for display (e.g., 0x1234...5678)
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress('');
    localStorage.removeItem('walletAddress');
  };

  const walletContextValue = {
    walletAddress,
    isMetaMaskInstalled,
    isConnecting,
    connectMetaMask,
    disconnectWallet,
    formatWalletAddress
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
}; 