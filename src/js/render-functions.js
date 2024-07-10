import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// Инициализация SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  nav: true,
});

export default function createGallery(imagesData) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  // Создание HTML строк для всех изображений
  const galleryHTML = imagesData
    .map(
      image => `
    <div class="card">
      <a href="${image.largeImageURL}" title="${image.tags}">
        <img src="${image.webformatURL}" alt="${image.tags}">
      </a>
      <div class="card-info">
        <p>Likes ${image.likes}</p>
        <p>Views ${image.views}</p>
        <p>Comments ${image.comments}</p>
        <p>Downloads ${image.downloads}</p>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryHTML);

  // Обновление lightbox после добавления новых элементов
  lightbox.refresh();
}
