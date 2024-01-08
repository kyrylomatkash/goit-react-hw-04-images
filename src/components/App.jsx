// Імпорт бібліотек і компонентів
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Paper } from '@mui/material';
import Searchbar from './searchbar-component/Searchbar';
import ImageGallery from './image-gallery-component/ImageGallery';
import LoadMoreButton from './button-component/Button';
import Loader from './loader-component/Loader';
import Modal from './modal-component/Modal';
// Імпорт логіки API запиту
import { fetchImages } from '../api/api';
// Основний клас застосунку
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    loadMore: true,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }
  // Пошук
  handleSearchSubmit = query => {
    if (!query.trim()) {
      toast.error('Please enter a search request.');
      return;
    }

    this.setState({ query, page: 1, images: [] });
  };
  // Вивантаження зображень з API
  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then(response => {
        const newImages = response.hits;

        if (newImages.length === 0) {
          toast.info('No more images found.');
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          loadMore: prevState.page < Math.ceil(response.totalHits / 12),
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        toast.error('Error fetching images. Please try again.');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  // Рендер
  render() {
    const { images, isLoading, showModal, selectedImage, loadMore } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <Paper>
          {images.length > 0 && (
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
          )}
          {isLoading && <Loader />}
          {loadMore && images.length > 0 && (
            <LoadMoreButton onClick={this.handleLoadMore}>
              Load More
            </LoadMoreButton>
          )}
        </Paper>
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </Container>
    );
  }
}
// Експорт
export default App;
