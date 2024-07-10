import searchImage from './js/pixabay-api';
import createGallery from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchBtn = document.querySelector('.search button');
const input = document.querySelector('.search input');
const gallery = document.querySelector('.gallery');

let isSearching = false; // Флаг для отслеживания состояния выполнения запроса
let page = 1;
const perPage = 15;

searchBtn.addEventListener('click', () => {
  if (isSearching) {
    return; // Если уже выполняется запрос, выходим из функции
  }

  if (input.value === '') {
    iziToast.info({
      title: 'Внимание',
      message: 'Введите текст для поиска изображений',
      position: 'topRight',
    });
    return;
  }

  isSearching = true; // Устанавливаем флаг выполнения запроса в true
  page = 1; // Сбрасываем страницу на 1 для нового поиска
  gallery.innerHTML = ''; // Очищаем галерею для нового поиска
  searchImages();
});

async function searchImages() {
  try {
    addLoader();
    const response = await searchImage(input.value, page, perPage);
    if (response.data.hits.length === 0) {
      iziToast.alert({
        title: 'Error',
        message: 'No images found. Please try again.',
        position: 'topRight',
      });
    } else {
      createGallery(response.data.hits);
      input.value = ''; // Очистить поле ввода после успешного поиска
      addFetchButton();
    }
  } catch (error) {
    console.error('Ошибка при выполнении поискового запроса:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred during the search. Please try again later.',
      position: 'topRight',
    });
  } finally {
    removeLoader(); // Убираем загрузчик после завершения запроса или при ошибке
    isSearching = false; // Сбрасываем флаг выполнения запроса
  }
}

function addFetchButton() {
  removeFetchButton(); // Удаляем существующую кнопку, если есть
  const fetchButton = document.createElement('button');
  fetchButton.textContent = 'Fetch more posts';
  fetchButton.addEventListener('click', fetchPosts);
  gallery.appendChild(fetchButton);
}

function removeFetchButton() {
  const fetchButton = gallery.querySelector('button');
  if (fetchButton) {
    fetchButton.remove();
  }
}

async function fetchPosts() {
  if (isSearching) {
    return; // Если уже выполняется запрос, выходим из функции
  }

  isSearching = true; // Устанавливаем флаг выполнения запроса в true
  page += 1; // Увеличиваем номер страницы для следующего запроса

  try {
    addLoader();
    const response = await searchImage(input.value, page, perPage);
    if (response.data.hits.length === 0) {
      iziToast.alert({
        title: 'Error',
        message: 'No more images found.',
        position: 'topRight',
      });
    } else {
      createGallery(response.data.hits);
      if (response.data.hits.length === perPage) {
        addFetchButton();
      }
    }
  } catch (error) {
    console.error('Ошибка при выполнении поискового запроса:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred during the search. Please try again later.',
      position: 'topRight',
    });
  } finally {
    removeLoader(); // Убираем загрузчик после завершения запроса или при ошибке
    isSearching = false; // Сбрасываем флаг выполнения запроса
  }
}

function addLoader() {
  gallery.insertAdjacentHTML(
    'afterbegin',
    '<div class="loader">Loading...</div>'
  );
}

function removeLoader() {
  const loader = gallery.querySelector('.loader');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
}
