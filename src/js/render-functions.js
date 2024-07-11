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

  // Loop through each image data and create corresponding HTML elements
  imagesData.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.title = image.tags;

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    link.appendChild(img);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    cardInfo.innerHTML = `
      <p>Likes ${image.likes}</p>
      <p>Views ${image.views}</p>
      <p>Comments ${image.comments}</p>
      <p>Downloads ${image.downloads}</p>
    `;

    card.appendChild(link);
    card.appendChild(cardInfo);

    gallery.appendChild(card);
  });

  // Update lightbox after adding new elements
  lightbox.refresh();
}
