/**
 * Color constants for the application
 * 
 * This file contains all the color values used throughout the application.
 * Using a centralized color system helps maintain consistency and makes
 * theme changes easier.
 */

// Main theme colors
export const COLORS = {
  // Primary UI Colors
  primary: {
    main: '#4a4e69',
    light: '#6c757d',
    dark: '#22223b',
    gradient: 'linear-gradient(90deg, #4a4e69, #22223b)',
    hoverGradient: 'linear-gradient(90deg, #6c757d, #343a40)',
  },
  
  // Secondary UI Colors
  secondary: {
    main: '#9a8c98',
    light: '#b5a9b3',
    dark: '#7d7185',
  },
  
  // Accent Colors
  accent: {
    yellow: '#ffcc00',
    yellowLight: '#ffaa00',
    red: {
      main: '#e53935',
      gradient: 'linear-gradient(90deg, #ff4444, #e53935)',
    },
    green: {
      main: '#4caf50',
      gradient: 'linear-gradient(90deg, #85e085, #4caf50)',
    },
    yellow: {
      main: '#fbc02d',
      gradient: 'linear-gradient(90deg, #ffeb3b, #fbc02d)',
    },
  },
  
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    disabled: '#a0a0a0',
  },
  
  // Background Colors
  background: {
    main: '#1e1e2e',
    modal: 'rgba(30, 30, 46, 0.95)',
    transparent: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Border Colors
  border: {
    light: '#4a4e69',
    dark: '#22223b',
  },
  
  // Shadow Colors
  shadow: {
    light: 'rgba(255, 255, 255, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.6)',
  },
  
  // Calm Mode Colors
  calmMode: {
    background: '#86a17d',
    buttonGradient: 'linear-gradient(90deg, #9fae9b, #7f9f7c)',
    buttonHoverGradient: 'linear-gradient(90deg, #a0b79d, #8ba982)',
    border: '#8b8f80',
    title: '#a6e0a6',
  },
};

export default COLORS; 