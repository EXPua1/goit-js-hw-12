import searchImage from './js/pixabay-api';

const searchBtn = document.querySelector('.search button');
const input = document.querySelector('.search input');
const gallery = document.querySelector('.gallery');

searchBtn.addEventListener('click', async () => {
  try {
    const response = await searchImage(input.value);
    console.log(response.data);
    if (response.data.hits.length === 0) {
      alert('gg');
    }
  } catch (error) {
    console.log(error);
  }
});
