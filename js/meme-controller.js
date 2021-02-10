'use strict';

const onImgClicked = (img) => {
  openEditor();
}

const openEditor = () => {
  const elGallery = document.querySelector('.main-content');
  const elEditor = document.querySelector('.meme-editor-container');
  elGallery.style.display = 'none';
  elEditor.style.display = 'grid';
}
