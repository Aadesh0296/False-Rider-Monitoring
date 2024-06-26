/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const PhotoGrid = ({ photos }) => {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div className="photo-grid-item" key={index}>
          <img src={photo.url} alt={`Photo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
