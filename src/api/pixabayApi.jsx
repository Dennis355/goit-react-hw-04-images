
import axios from 'axios';

const API_KEY = '33402985-baebf4c5b13a450aa17c962d8';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;


axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: perPage,
};

export const fetchData = async (query, page ) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };
  const response = await axios.get('', config);
  return response.data;
};



















