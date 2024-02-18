import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define a keyframe animation for spinning.
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the loader using CSS animations.
const StyledLoader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); // Creates a light grey border for the unloaded portion.
  border-top: 4px solid #007bff; // Blue border color for the loading portion to make it visible.
  border-radius: 50%; // Makes the loader circular.
  width: 50px; // Sets a fixed width for the loader.
  height: 50px; // Sets a fixed height for the loader to maintain aspect ratio.
  animation: ${spin} 2s linear infinite; // Applies the spinning animation.
  margin: 40px auto; // Centers the loader horizontally with margin.
  display: block; // Ensures the loader is block-level for proper margin handling.
`;

const Loader: React.FC = () => {
  return (
    // Use of role and aria-label for accessibility. Indicates the purpose of the element to screen readers.
    <StyledLoader role="alert" aria-live="assertive" aria-label="Loading content, please wait."></StyledLoader>
  );
};

export default Loader;
