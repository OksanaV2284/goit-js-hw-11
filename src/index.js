import './css/styles.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import createMarkupList from './murkup';
import NewsApiServise from './api_servise';
import { LoadMoreBtn } from './murkup';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

// const loadMoreBtn = document.querySelector('.load-more');
const newsApiServise = new NewsApiServise();
const lightboxGallery = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onClickLoadMore);

async function onSearch(e) {
  e.preventDefault();

  newsApiServise.query = e.currentTarget.elements.searchQuery.value;
  if (newsApiServise.query === '') {
    return Notiflix.Notify.info(`Рядок порожній, введіть слово для пошуку.`);
  }
  clearHitsMurkup();
  try {
    await newsApiServise.fetchArticle().then(appendHitsMurkup);
    if (newsApiServise.totalHits !== 0) {
      Notiflix.Notify.success(
        `Hooray! We found ${newsApiServise.totalHits} images.`
      );
    }
    lightboxGallery.refresh();
    loadMoreBtn.show();
    newsApiServise.updatePage();
    newsApiServise.incrementPage();
    emptyArray();
  } catch (error) {
    console.log(error);
  }

  // newsApiServise.resetPage();
  // newsApiServise.fetchArticle().then(hits => {
  //   appendHitsMurkup(hits);
  // });
}

function onClickLoadMore() {
  if (newsApiServise.query === '') {
    return;
  } else if (newsApiServise.totalHits <= newsApiServise.totalNumberAppeals()) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtn.hide();
    return;
  }
  newsApiServise.fetchArticle().then(appendHitsMurkup);
  lightboxGallery.refresh();
  newsApiServise.incrementPage();
}
function appendHitsMurkup(hits) {
  gallery.insertAdjacentHTML('afterbegin', createMarkupList(hits));
}
function clearHitsMurkup() {
  gallery.innerHTML = '';
}
function emptyArray() {
  if (NewsApiServise.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hide();
  }
}
