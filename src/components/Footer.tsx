import React from 'react';
import styled from 'styled-components';

// Using `footer` tag for semantic HTML, enhancing accessibility and SEO.
const StyledFooter = styled.footer`
  background: #343a40; // Dark background for contrast with white text.
  color: #ffffff; // White text for readability.
  padding: 2rem; // Uniform padding for spacing.
  display: flex; // Flexbox for layout flexibility.
  justify-content: space-between; // Spacing out child elements.
  align-items: center; // Vertically centers the content.
  flex-wrap: wrap; // Allows items to wrap in smaller screens.
  gap: 1rem; // Gap between items for visual separation.

  @media (max-width: 768px) {
    justify-content: center; // Center items on smaller screens.
    text-align: center; // Center text alignment for readability.
  }
`;

// Footer text styled component for copyright info.
const FooterText = styled.p`
  margin: 0; // Removes default margin for consistent spacing.
`;

// Container for social media links, using flex for alignment.
const SocialLinks = styled.div`
  display: flex; // Layout social links in a row.
  gap: 2rem; // Spacing between links for ease of clicking.
`;

// Styles for individual social link, with hover effects.
const SocialLink = styled.a`
  color: #ffffff; // Matches the footer text color.
  text-decoration: none; // Removes underline from links for cleaner look.
  &:hover {
    color: #007bff; // Changes color on hover for visual feedback.
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      {/* Dynamic year in copyright text for automatic updating. */}
      <FooterText>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</FooterText>
      
      {/* Placeholder links for demonstration. In a real application, these would link to your social media profiles. */}
      <SocialLinks>
        <SocialLink href="#" aria-label="Twitter">Twitter</SocialLink>
        <SocialLink href="#" aria-label="Facebook">Facebook</SocialLink>
        <SocialLink href="#" aria-label="LinkedIn">LinkedIn</SocialLink>
      </SocialLinks>
    </StyledFooter>
  );
};

export default Footer;
