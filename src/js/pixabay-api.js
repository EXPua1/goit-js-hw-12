import axios from 'axios';

const apiKey = '44853221-20be0a035158c611166c29677';
const apiUrl = 'https://pixabay.com/api/';

export default async function searchImage(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `${apiUrl}?key=${apiKey}&q=${encodedQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  return axios.get(url);
}
