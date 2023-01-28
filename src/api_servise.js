import axios from 'axios';

export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = 0;
  }

  async fetchArticle() {
    const MY_KEY = '33090584-e145dbc56acc5f5d28d190c44';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    // console.log(response);

    this.totalHits = response.data.totalHits;

    if (!response.data.hits) {
      throw new Error('Error');
    }

    return response.data.hits;
  }
  totalNumberAppeals() {
    return this.perPage * this.page;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuer) {
    this.searchQuery = newQuer;
  }
}
