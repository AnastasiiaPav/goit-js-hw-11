import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchImg, per_page } from './fetchImg';
import { debounce } from 'debounce';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let numberPage = 1;
let userSearch = '';


form.addEventListener('submit', searchPhoto);

async function searchPhoto(event) {
  event.preventDefault();
  try{ 
  userSearch = event.target.elements[0].value;
  gallery.innerHTML = '';
  numberPage = 1;
  const resultImg = await fetchImg(userSearch, numberPage);
  const  { hits, totalHits } = resultImg.data;
  console.log(totalHits)
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (userSearch !== '') {
      shablon(resultImg.data.hits);
        return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      } 
    } 
    
    catch{
    }
}


 function shablon(event) {
  const set =  event
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href=${largeImageURL}>
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width='450' height='350'/>
        <div class="info">
          <p class="info-item">
            <b> ❤ ${likes}</b>
          </p>
          <p class="info-item">
            <b> 👁  ${views}</b>
          </p>
          <p class="info-item">
            <b> ✒  ${comments}</b>
          </p>
          <p class="info-item">
            <b>  ☄ ${downloads}</b>
          </p>
        </div>
        </a>
      </div>`;
    })
    .join(' ');
  gallery.insertAdjacentHTML('beforeend', set);
}

window.addEventListener('scroll', debounce(scrollGallery, 300));


async function loadMorePhotos() {
  numberPage = numberPage + 1;
  if (userSearch !== '') {
    try{  
      const resultImg = await fetchImg(userSearch, numberPage);
    // resultImg;
     shablon(resultImg.data.hits);
     if ( resultImg.data.totalHits === gallery.children.length) {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        )}
  } catch(error){
  } } 
};

 async function scrollGallery() {
  const docRect = document.documentElement.getBoundingClientRect();
  if (docRect.bottom < document.documentElement.clientHeight + 150) {
   await loadMorePhotos();
  }
}
