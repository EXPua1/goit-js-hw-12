import searchImage from './js/pixabay-api';
import createGallery from './js/render-functions';

import {
  infoMessage,
  addLoader,
  removeLoader,
  scrollToNewImages,
  endCollection,
} from './js/functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('searchForm');
const input = document.querySelector('.search input');
const gallery = document.querySelector('.gallery');
const buttonContainer = document.getElementById('button-container');

let currentQuery = '';
let isSearching = false;
let page = 1;
const perPage = 15;
let totalHits = 0;
let hasMoreImages = true;

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  if (isSearching) {
    return;
  }
  if (input.value.trim() === '') {
    infoMessage();
    return;
  }
  isSearching = true;
  page = 1;
  currentQuery = input.value.trim();
  gallery.innerHTML = '';
  hasMoreImages = true;
  searchImages();
});

async function searchImages() {
  try {
    addLoader();
    const response = await searchImage(currentQuery, page, perPage);
    totalHits = response.data.totalHits;
    if (response.data.hits.length === 0) {
      removeFetchButton();
      showErrorToast('No images found.');

      input.value = ''; // Clear input field on no results
      return;
    } else {
      createGallery(response.data.hits);
      checkAndDisplayFetchButton(response.data.hits.length);
      if (totalHits <= page * perPage) {
        removeFetchButton();
        setTimeout(() => {
          endCollection();
        }, 500);
      }
    }
  } catch (error) {
    console.error('Error during the search request:', error);
    showErrorToast('An error occurred during the search.');
  } finally {
    removeLoader();
    isSearching = false;
  }
}

function checkAndDisplayFetchButton(currentBatchLength) {
  if (currentBatchLength < perPage) {
    hasMoreImages = false;
  }
  if (hasMoreImages) {
    addFetchButton();
  }
}

function addFetchButton() {
  if (!document.getElementById('fetchButton')) {
    const fetchButton = document.createElement('button');
    fetchButton.id = 'fetchButton';
    fetchButton.textContent = 'Load More Images';
    fetchButton.addEventListener('click', fetchPosts);
    buttonContainer.appendChild(fetchButton);
  }
}

function removeFetchButton() {
  const fetchButton = document.getElementById('fetchButton');
  if (fetchButton) {
    fetchButton.remove();
  }
}

async function fetchPosts() {
  if (isSearching) {
    return;
  }
  isSearching = true;
  page += 1;

  try {
    addLoader();
    const response = await searchImage(currentQuery, page, perPage);
    if (response.data.hits.length === 0) {
      showErrorToast('No more images found.');
      hasMoreImages = false;
    } else {
      createGallery(response.data.hits);
      checkAndDisplayFetchButton(response.data.hits.length);
      if (totalHits <= page * perPage) {
        removeFetchButton();
        setTimeout(() => {
          endCollection();
        }, 500);
      }
      scrollToNewImages();
    }
  } catch (error) {
    console.error('Error during the search request:', error);
    showErrorToast('An error occurred during the search.');
  } finally {
    removeLoader();
    isSearching = false;
  }
}

function showErrorToast(message = 'An unexpected error occurred.') {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

document.addEventListener('touchstart', function () {}, { passive: true });
document.addEventListener('touchmove', function () {}, { passive: true });
