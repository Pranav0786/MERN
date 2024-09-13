import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchHomeworld = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};