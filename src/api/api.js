// Імпорт бібліотеки
import axios from 'axios';
// API ключ
const API_KEY = '34349761-3a6c23f95a8981b52fe6e345c';
// Отримання зображень
const fetchImages = (query, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
};
// Експорт
export { fetchImages };
