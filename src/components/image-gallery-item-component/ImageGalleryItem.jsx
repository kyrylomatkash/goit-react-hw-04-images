// Імпорт бібліотек
import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Button,
  Modal,
  Typography,
  Box,
} from '@mui/material';
import { FacebookShareButton, PinterestShareButton } from 'react-share';
// Основна функція компоненту
const ImageGalleryItem = ({ image, onImageClick }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  // Завантаження фото
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = image.largeImageURL;
    downloadLink.download = `pixabay_image_${image.id}`;
    downloadLink.click();
  };
  // Відкриття модалки з деталями
  const handleDetailsModalOpen = () => {
    setDetailsModalOpen(true);
  };
  // Закриття модалки з деталями
  const handleDetailsModalClose = () => {
    setDetailsModalOpen(false);
  };

  const shareUrl = image.largeImageURL;
  const title = 'There is a nice image';

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={image.webformatURL}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={() => onImageClick(image.largeImageURL)}
        />
        <Box p={2}>
          <Button variant="outlined" fullWidth onClick={handleDetailsModalOpen}>
            View Details
          </Button>
          <Modal open={isDetailsModalOpen} onClose={handleDetailsModalClose}>
            <Box
              sx={{
                position: 'absolute',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Typography variant="h5">Details</Typography>
              <Typography>Tags: {image.tags}</Typography>
              <Typography>Likes: {image.likes}</Typography>
              <Typography>Comments: {image.comments}</Typography>
              <Button variant="outlined" fullWidth onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outlined" fullWidth>
                <FacebookShareButton url={shareUrl} quote={title}>
                  Facebook
                </FacebookShareButton>
              </Button>
              <Button variant="outlined" fullWidth>
                <PinterestShareButton
                  url={shareUrl}
                  media={image.webformatURL}
                  description={title}
                >
                  Pinterest
                </PinterestShareButton>
              </Button>
            </Box>
          </Modal>
        </Box>
      </Card>
    </Grid>
  );
};
// Експорт
export default ImageGalleryItem;
