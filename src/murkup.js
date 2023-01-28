export default function createMarkupList(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="gallery"> <div class="photo-card">
  <a href="${largeImageURL}" class="link" ><img class=gallery-img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>  ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>
</div>`
    )
    .join('');
}

export class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);

    return refs;
  }

  hide() {
    this.refs.button.style.display = 'none';
    this.refs.button.classList.add('is-hidden');
  }

  show() {
    this.refs.button.style.display = 'inline-flex';
    this.refs.button.classList.remove('is-hidden');
  }
}
