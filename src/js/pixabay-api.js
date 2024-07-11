import axios from 'axios';

const apiKey = '44853221-20be0a035158c611166c29677';
const apiUrl = 'https://pixabay.com/api/';

export default async function searchImage(query, page = 1, per_page = 15) {
  const encodedQuery = encodeURIComponent(query);
  const url = `${apiUrl}?key=${apiKey}&q=${encodedQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

  return axios.get(url);
}
