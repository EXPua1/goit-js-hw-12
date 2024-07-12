import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const gallery = document.querySelector('.gallery');

export function errorMessage() {
  iziToast.alert({
    title: 'Error',
    message: 'No images found. Please try again.',
    position: 'topRight',
  });
}

export function infoMessage() {
  iziToast.info({
    title: 'Внимание',
    message: 'Введите текст для поиска изображений',
    position: 'topRight',
  });
}

export function addLoader() {
  gallery.insertAdjacentHTML(
    'afterbegin',
    '<div class="loader">Loading...</div>'
  );
}

// Функция для удаления загрузчика из галереи
export function removeLoader() {
  const loader = gallery.querySelector('.loader');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
}

export function endCollection() {
  iziToast.info({
    title: 'Attention',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

export function scrollToNewImages() {
  const galleryItems = document.querySelectorAll('.gallery .card');
  if (galleryItems.length > 0) {
    const lastItem = galleryItems[galleryItems.length - 1];
    const itemHeight = lastItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}

export function showErrorToast(message = 'An unexpected error occurred.') {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
