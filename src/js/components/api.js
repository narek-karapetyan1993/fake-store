import axios from 'axios';

export default async function getProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
