import searchImage from './js/pixabay-api';
import createGallery from './js/render-functions';

import {
  errorMessage,
  infoMessage,
  addLoader,
  removeLoader,
  scrollToNewImages,
} from './js/functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchBtn = document.querySelector('.search button');
const input = document.querySelector('.search input');
const gallery = document.querySelector('.gallery');
const searchForm = document.getElementById('searchForm');
const buttonContainer = document.getElementById('button-container'); // Новий контейнер для кнопки

let currentQuery = '';
let isSearching = false; // Flag to track the state of the request
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', event => {
  event.preventDefault(); // Prevent the default form submission behavior

  if (isSearching) {
    return; // If a request is already in progress, exit the function
  }
  if (input.value.trim() === '') {
    infoMessage();
    return;
  }
  isSearching = true; // Set the flag indicating a request is in progress
  page = 1; // Reset the page number to 1 for a new search
  currentQuery = input.value.trim();
  gallery.innerHTML = ''; // Clear the gallery for a new search
  searchImages();
});

async function searchImages() {
  try {
    addLoader();
    const response = await searchImage(currentQuery, page, perPage);
    if (response.data.hits.length === 0) {
      errorMessage();
      gallery.innerHTML = '';
    } else {
      createGallery(response.data.hits);
      input.value = ''; // Clear the input field after a successful search
      if (response.data.hits.length === perPage) {
        addFetchButton();
      }
      if (response.data.totalHits <= page * perPage) {
        removeFetchButton();
        setTimeout(() => {
          endCollection();
        }, 500); // Delay of 500 milliseconds
      }
    }
  } catch (error) {
    console.error('Error during the search request:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred during the search. Please try again later.',
      position: 'topRight',
    });
  } finally {
    removeLoader(); // Remove the loader after the request completes or an error occurs
    isSearching = false; // Reset the request flag
  }
}

function addFetchButton() {
  removeFetchButton(); // Remove any existing fetch button if present
  const fetchButton = document.createElement('button');
  fetchButton.id = 'fetchButton'; // Add an id to the fetch button
  fetchButton.textContent = 'Load More Images';
  fetchButton.addEventListener('click', fetchPosts);
  buttonContainer.appendChild(fetchButton); // Додайте кнопку в новий контейнер
}

function removeFetchButton() {
  const fetchButton = buttonContainer.querySelector('#fetchButton');
  if (fetchButton) {
    fetchButton.remove();
  }
}

async function fetchPosts() {
  if (isSearching) {
    return; // If a request is already in progress, exit the function
  }
  isSearching = true; // Set the flag indicating a request is in progress
  page += 1; // Increment the page number for the next request

  try {
    addLoader();
    const response = await searchImage(currentQuery, page, perPage);
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
      if (response.data.totalHits <= page * perPage) {
        removeFetchButton();
        setTimeout(() => {
          endCollection();
        }, 500); // Delay of 500 milliseconds
      }
      // Scroll the page down after adding new images
      scrollToNewImages();
    }
  } catch (error) {
    console.error('Error during the search request:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred during the search. Please try again later.',
      position: 'topRight',
    });
  } finally {
    removeLoader(); // Remove the loader after the request completes or an error occurs
    isSearching = false; // Reset the request flag
  }
}
