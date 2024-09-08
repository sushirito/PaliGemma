import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const predictTiredness = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', "Is the person tired? Explain.");

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};