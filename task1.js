import gallery from './gallery-items.js';

const htmlLinkRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox__image');
const arrayOfLinks = gallery.map(element => element.original);
let currentIndex = 0;

const liListRef = gallery.map(element => renderElement(element));
htmlLinkRef.append(...liListRef);

htmlLinkRef.addEventListener('click', checkOpenTarget);
modalRef.addEventListener('click', checkCloseTarget);

function renderElement(element) {
  const liRef = document.createElement('li');
  liRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.href = element.original;

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.src = element.preview;
  imgRef.dataset.source = element.original;
  imgRef.alt = element.description;

  liRef.appendChild(linkRef).appendChild(imgRef);

  return liRef;
}

function checkOpenTarget() {
  if (event.target.nodeName != 'IMG') {
    return;
  }
  onOpenModal();
}

function checkCloseTarget() {
  if (event.target.nodeName != 'BUTTON' && event.target.nodeName != 'DIV') {
    return;
  }
  onCloseModal();
}

function onOpenModal() {
  window.addEventListener('keydown', pressKeyIdent);
  event.preventDefault();
  modalRef.classList.add('is-open');
  modalImgRef.src = event.target.dataset.source;
  currentIndex = arrayOfLinks.indexOf(event.target.dataset.source);
}

function onCloseModal() {
  window.removeEventListener('keydown', pressKeyIdent);
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
}

function pressKeyIdent() {
  switch (event.code) {
    case 'Escape':
      onCloseModal();
      break;

    case 'ArrowLeft':
      currentIndex -= 1;
      if (currentIndex < 0) {
        currentIndex = arrayOfLinks.length - 1;
      }
      modalImgRef.src = arrayOfLinks[currentIndex];
      break;

    case 'ArrowRight':
      currentIndex += 1;
      if (currentIndex === arrayOfLinks.length) {
        currentIndex = 0;
      }
      modalImgRef.src = arrayOfLinks[currentIndex];
      break;
  }
}
