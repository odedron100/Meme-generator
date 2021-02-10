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
  openEditor();
  renderMeme(imgId)
  // const currImg = getCurrImgById(imgId);
  updateCurrMeme(imgId, 0)
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

function renderMeme(imgId, txt = '') {
  const currImage = getCurrImgById(imgId);
  const img = new Image();
  img.src = currImage.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(txt);
  }
}

const onHandleText = (ev) => {
  var currMeme = getCurrMeme();
  updateCurrMeme(currMeme.selectedImgId, 0, ev.target.value);
  currMeme = getCurrMeme();
  renderMeme(currMeme.selectedImgId, currMeme.lines[0].txt)

}

const renderCanvas = () => {
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');
}
