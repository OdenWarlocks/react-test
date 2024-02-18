import React from 'react';
import styled from 'styled-components';

// Styling for the navigation bar.
const StyledNav = styled.nav`
  background: #007bff; // Bright blue background for high contrast with white text.
  color: #ffffff; // White text color for readability.
  padding: 1rem 2rem; // Padding around the content for visual spacing.
  display: flex; // Flex display to align logo and navigation links.
  justify-content: space-between; // Distributes space between logo and links.
  align-items: center; // Vertically centers items within the navbar.

  @media (max-width: 768px) {
    flex-direction: column; // Stacks items vertically on smaller screens.
    gap: 1rem; // Adds space between stacked items for readability.
  }
`;

// Styling for the logo with increased emphasis.
const Logo = styled.div`
  font-size: 1.5rem; // Larger font size for logo prominence.
  font-weight: bold; // Bold font weight for logo to stand out.
`;

// Container for navigation links, ensuring they are evenly spaced and aligned.
const NavLinks = styled.div`
  display: flex; // Flex display to align navigation links horizontally.
  gap: 2rem; // Space between each link for easy interaction.

  @media (max-width: 768px) {
    flex-direction: column; // Stacks links vertically on smaller screens.
    align-items: center; // Centers links for a tidy appearance.
    width: 100%; // Full width to utilize available space.
    text-align: center; // Ensures text is centered within each link.
  }
`;

// Styling for individual navigation links, with a hover effect for interactivity.
const NavLink = styled.a`
  color: #ffffff; // Matches the navbar text color for consistency.
  text-decoration: none; // Removes underline from links for a clean look.
  &:hover {
    text-decoration: underline; // Adds underline on hover for visual feedback.
  }
`;

const Nav: React.FC = () => {
  return (
    <StyledNav>
      
      <Logo>Logo</Logo>
      
      {/* Navigation links for site navigation. */}
      <NavLinks>
        <NavLink href="/">Home</NavLink>
        {/* Additional links can be added here. */}
      </NavLinks>
    </StyledNav>
  );
};

export default Nav;
