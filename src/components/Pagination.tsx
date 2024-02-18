import React from 'react';
import styled from 'styled-components';

// Styling for the pagination container with centered alignment.
const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center; // Centers pagination buttons.
  padding: 20px; // Adds padding for spacing from other elements.
`;

// Styling for individual page number buttons.
const PageNumber = styled.button`
  margin: 0 5px; // Adds margin for spacing between buttons.
  padding: 5px 10px; // Padding for better button size and clickability.
  border: none; // Removes the default border.
  background-color: #343a40; // Dark background for contrast with white text.
  color: white; // White text for readability.
  cursor: pointer; // Changes cursor to pointer to indicate button functionality.

  &:disabled {
    background-color: #ccc; // Lighter background for disabled buttons to indicate non-interactivity.
    cursor: default; // Changes cursor to default for disabled buttons.
  }

  &:focus {
    outline: 2px solid #007bff; // Adds outline on focus for keyboard navigation visibility.
  }
`;


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    
    <PaginationContainer aria-label="Pagination">
      {/* Previous page button, disabled on the first page */}
      <PageNumber 
        disabled={currentPage <= 1} 
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        Prev
      </PageNumber>

      {/* Generates page number buttons dynamically based on total pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <PageNumber 
          key={page} 
          disabled={currentPage === page} 
          onClick={() => onPageChange(page)}
          aria-label={`Go to Page ${page}`}
        >
          {page}
        </PageNumber>
      ))}

      {/* Next page button, disabled on the last page */}
      <PageNumber 
        disabled={currentPage >= totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        Next
      </PageNumber>
    </PaginationContainer>
  );
};

export default Pagination;
