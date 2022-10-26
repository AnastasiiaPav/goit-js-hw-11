import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import { fetchImg } from './fetchImg';

const form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const buttonSubmit = document.querySelector('[type="submit"]');
const gallery = document.querySelector('.gallery');

let numberPage = 1;
let userSearch = '';
let counter = '';

form.addEventListener('submit', searchPhoto);

function searchPhoto(event) {
  event.preventDefault();
  userSearch = event.target.elements[0].value;
  gallery.innerHTML = '';
  numberPage = 1;
  fetchImg().then(response => {
    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (userSearch !== '') {
      fetchImg(userSearch, numberPage).then(image => shablon(image.data.hits));
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  });
}

function shablon(event) {
  const set = event
    .map(img => {
      return `<div class="photo-card">
      <a href=${img.largeImageURL}>
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" width='450' height='350'/>
        <div class="info">
          <p class="info-item">
            <b> ❤ ${img.likes}</b>
          </p>
          <p class="info-item">
            <b> 👁  ${img.views}</b>
          </p>
          <p class="info-item">
            <b> ✒  ${img.comments}</b>
          </p>
          <p class="info-item">
            <b>  ☄ ${img.downloads}</b>
          </p>
        </div>
        </a>
      </div>`;
    })
    .join(' ');
  gallery.insertAdjacentHTML('beforeend', set);
}

window.addEventListener('scroll', scrollGallery);

function loadMorePhotos() {
   numberPage = numberPage + 1;
  if (userSearch !== '') {
    fetchImg(userSearch, numberPage).then(image => shablon(image.data.hits));
  }
}

function scrollGallery() {
  const docRect = document.documentElement.getBoundingClientRect();
  if (docRect.bottom < document.documentElement.clientHeight + 150) {
    loadMorePhotos();
  }
}

// else if( fetchImg.then(image => fetchImg(image.data.hits) <= fetchImg(image.data.totalHits))) {
//   return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
// }

// else if ( numberPage <= page){
//   console.log('ctranichka',page)
//   console.log(numberPage)
//   numberPage += 1;
// }
