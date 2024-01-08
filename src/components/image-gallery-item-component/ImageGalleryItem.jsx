// Імпорт бібліотек
import React, { Component } from 'react';
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
// Основний клас компоненту
class ImageGalleryItem extends Component {
  state = {
    isDetailsModalOpen: false,
  };
  // Завантаження фото
  handleDownload = () => {
    const { image } = this.props;
    const downloadLink = document.createElement('a');
    downloadLink.href = image.largeImageURL;
    downloadLink.download = `pixabay_image_${image.id}`;
    downloadLink.click();
  };
  // Відкриття модалки з деталями
  handleDetailsModalOpen = () => {
    this.setState({ isDetailsModalOpen: true });
  };
  // Закриття модалки з деталями
  handleDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  };
  // Рендер
  render() {
    const { image, onImageClick } = this.props;
    const { isDetailsModalOpen } = this.state;

    const shareUrl = image.largeImageURL;
    const title = 'There is nice image';

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
            <Button
              variant="outlined"
              fullWidth
              onClick={this.handleDetailsModalOpen}
            >
              View Details
            </Button>
            <Modal
              open={isDetailsModalOpen}
              onClose={this.handleDetailsModalClose}
            >
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
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={this.handleDownload}
                >
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
  }
}
// Експорт
export default ImageGalleryItem;
