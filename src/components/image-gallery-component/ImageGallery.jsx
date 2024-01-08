// Імпорт бібліотек і компонентів
import React from 'react';
import ImageGalleryItem from '../image-gallery-item-component/ImageGalleryItem';
import { Grid } from '@mui/material';

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <Grid container spacing={2}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </Grid>
  );
};
// Експорт
export default ImageGallery;
