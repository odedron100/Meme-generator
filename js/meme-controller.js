'use strict';

const init = () => {
  renderGallery();
}

const renderGallery = () => {
  const imgs = getImgs();
  const strHTMLS = imgs.map(img => {

    return `
      <img src="/img/${img.id}.jpg" onclick="onImgClicked(this)">
    `
  }).join(' ');
  const elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHTMLS;
}

const onImgClicked = (img) => {
  openEditor();
}

const openEditor = () => {
  const elContent = document.querySelector('.main-content');
  const elEditor = document.querySelector('.meme-editor-container');
  elContent.style.display = 'none';
  elEditor.style.display = 'grid';
}

const openOpenGallery = () => {
  const elContent = document.querySelector('.main-content');
  const elEditor = document.querySelector('.meme-editor-container');
  elContent.style.display = 'grid';
  elEditor.style.display = 'none';
}
