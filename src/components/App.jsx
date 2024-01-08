// Імпорт бібліотек і компонентів
import React, { useState, useEffect } from 'react';
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
// Основна функція застосунку
const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loadMore, setLoadMore] = useState(true);

  // Пошук
  const handleSearchSubmit = query => {
    if (!query.trim()) {
      toast.error('Please enter a search request.');
      return;
    }

    setQuery(query);
    setPage(1);
    setImages([]);
  };

  // Вивантаження зображень з API
  useEffect(() => {
    if (query.trim() !== '') {
      setIsLoading(true);

      fetchImages(query, page)
        .then(response => {
          const newImages = response.hits;

          if (newImages.length === 0) {
            toast.info('No more images found.');
          }

          setImages(prevImages => [...prevImages, ...newImages]);
          setLoadMore(page < Math.ceil(response.totalHits / 12));
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          toast.error('Error fetching images. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchSubmit} />
      <Paper>
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={handleImageClick} />
        )}
        {isLoading && <Loader />}
        {loadMore && images.length > 0 && (
          <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
        )}
      </Paper>
      {showModal && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </Container>
  );
};

// Експорт
export default App;
