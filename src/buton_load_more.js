// export default class LoadMoreBtn {
//   constructor({ selector, hidden = false }) {
//     this.refs = this.getRefs(selector);

//     hidden && this.hide();
//   }

//   getRefs(selector) {
//     const refs = {};
//     refs.button = document.querySelector(selector);

//     return refs;
//   }

//   hide() {
//     this.refs.button.style.display = 'none';
//     this.refs.button.classList.add('is-hidden');
//   }

//   show() {
//     this.refs.button.style.display = 'inline-flex';
//     this.refs.button.classList.remove('is-hidden');
//   }
// }
