import React, { useState } from 'react';
import './CategoryButton.css'; // Create this file for styling

const CategoryButton = ({ categories }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="category-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Categories
      {isHovered && (
        <div className="category-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryButton;