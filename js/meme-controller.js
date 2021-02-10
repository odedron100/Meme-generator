'use strict';
var gElCanvas;
var gCtx;

const init = () => {
  renderGallery();
  renderCanvas();
}

const renderGallery = () => {
  const imgs = getImgs();
  const strHTMLS = imgs.map(img => {

    return `
      <img src="/img/${img.id}.jpg" onclick="onImgClicked(${img.id})">
    `
  }).join(' ');
  const elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHTMLS;
}

const onImgClicked = (imgId) => {
  // var imgSrc = img.src;
  // var imgUrl = imgSrc.substr(imgSrc.indexOf('img'), imgSrc.length);
  openEditor();
  renderMeme(imgId)
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

function renderMeme(imgId) {
  const currImage = getCurrImg(imgId);
  const img = new Image();
  img.src = currImage.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}

const renderCanvas = () => {
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');
}
