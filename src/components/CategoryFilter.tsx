import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Style for the dropdown container, focusing on center alignment and positioning.
const DropdownContainer = styled.div`
  display: flex;
  justify-content: center; // Centers the dropdown.
  padding: 20px; // Adds padding around the dropdown for spacing.
  position: relative; // Enables absolute positioning of child elements.
`;

// Style for the select dropdown, enhancing its appearance and functionality.
const StyledSelect = styled.select`
  padding: 12px 24px; // Comfortable padding around text.
  border: 1px solid #007bff; // Border color for visual distinction.
  border-radius: 20px; // Rounded corners for a modern look.
  background-color: #f8f9fa; // Light background for contrast and readability.
  font-size: 16px; // Readable text size.
  font-weight: 500; // Medium font weight for text clarity.
  color: #495057; // Dark color for text for readability.
  cursor: pointer; // Cursor change to indicate interactability.
  outline: none; // Removes the outline to customize focus styles.
  transition: all 0.3s ease-in-out; // Smooth transition for interactions.
  appearance: none; // Removes default styling by the browser.
  position: absolute; // Allows centering based on parent's position.
  left: 50%; // Positions the center of the element in the middle of the parent.
  transform: translateX(-50%); // Correctly centers the element.
  width: auto; // Width adjusts to content width.
  max-width: 300px; // Limits the maximum width to ensure UI consistency.
  min-width: 200px; // Ensures a minimum width for short text options.

  // Custom arrow styling for a consistent look across browsers.
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%23007bff"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center; // Positions the arrow icon.
  background-size: 12px 12px; // Sets a fixed size for the arrow icon.
  padding-right: 36px; // Adjusts padding to prevent text overlap with the arrow.
`;

// Hidden span for measuring the width of the selected option's text.
const TextWidthMeasure = styled.span`
  visibility: hidden; // Hides the span from view.
  white-space: nowrap; // Prevents text wrapping to accurately measure width.
  font-size: 16px; // Matches the font size of the select.
  font-weight: 500; // Matches the font weight of the select.
  padding: 12px 24px; // Matches the padding of the select.
  position: absolute; // Removes the span from the normal document flow.
  top: 0;
  left: -9999px; // Positions the span far off-screen.
`;

// Interfaces for category properties and component props.
interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const textWidthMeasureRef = useRef<HTMLSpanElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Extracts the current category from the URL query parameters.
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get('category');

  // Adjusts the select width based on the selected option's text width.
  const adjustSelectWidth = () => {
    if (textWidthMeasureRef.current && selectRef.current) {
      const selectedOption = selectRef.current.querySelector('option:checked');
      const text = selectedOption ? selectedOption.textContent : '';
      textWidthMeasureRef.current.textContent = text || '';
      const textWidth = textWidthMeasureRef.current.offsetWidth;
      selectRef.current.style.width = `${textWidth + 50}px`; // Adjusts width dynamically.
    }
  };

  useEffect(() => {
    adjustSelectWidth(); // Adjusts width on component mount and updates.
  }, [currentCategory, categories]);

  // Handles category selection changes and navigates accordingly.
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    const params = new URLSearchParams(location.search);

    if (selectedCategory) {
      params.set('category', selectedCategory); // Updates the URL with the selected category.
    } else {
      params.delete('category'); // Removes the category parameter if selection is cleared.
    }

    navigate({ search: params.toString() }); // Navigates to the updated URL.
    adjustSelectWidth(); // Adjusts the select width based on the new selection.
  };

  return (
    <DropdownContainer>
      <StyledSelect ref={selectRef} onChange={handleCategoryChange} value={currentCategory || ''}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </StyledSelect>
      <TextWidthMeasure ref={textWidthMeasureRef} />
    </DropdownContainer>
  );
};

export default CategoryFilter;
