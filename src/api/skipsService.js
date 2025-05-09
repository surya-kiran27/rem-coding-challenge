import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSkips = async (postcode = 'NR32', area = 'Lowestoft') => {
  try {
    const response = await api.get(`/skips/by-location?postcode=${postcode}&area=${area}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};

