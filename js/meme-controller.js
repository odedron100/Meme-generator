'use strict';
var gElCanvas;
var gCtx;
var KEY = 'mems';
var gCountBaby = 1;
var gCountpets = 1;
var gCountFunny = 1;
var gCountActor = 1;

const init = () => {
  renderGallery();
  renderCanvas();
  createMems();
  updatePage('gallery');

  const elEditor = document.querySelector('.meme-editor-modal-container');
  elEditor.addEventListener('click', (e) => {
    const memeModal = document.querySelector('.meme-editor-modal');
    if (e.target === elEditor || e.target === memeModal) {
      openGallery();
    }
  });
}

const renderGallery = (imgsAfterSearch) => {
  let imgs = getImgs();
  if (imgsAfterSearch) {
    imgs = imgsAfterSearch;
  }
  console.log('imgs', imgs);
  const strHTMLS = imgs.map(img => {

    return `
      <div style="background-image: url(img/${img.id}.jpg)" onclick="onImgClicked(${img.id})"></div>
    `;
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
  const elEditor = document.querySelector('.meme-editor-modal-container');
  const elMems = document.querySelector('.save-mems-container');
  elEditor.classList.add('visible');
  elMems.style.display = 'none';

}

const openGallery = () => {
  console.log('oopenGallery');
  const elContent = document.querySelector('.main-content');
  const elEditor = document.querySelector('.meme-editor-modal-container');
  const elMems = document.querySelector('.save-mems-container');
  elContent.style.display = 'grid';
  elEditor.classList.remove('visible');
  elMems.style.display = 'none';
  updatePage('gallery');
  renderGallery();
}

function renderMeme(imgId) {
  const currImage = getCurrImgById(imgId);
  const img = new Image();
  img.src = currImage.url;
  img.onload = () => {
    var currMeme = getCurrMeme();
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach(line => {
      drawText(line.txt, line.x, line.y, line.color, line.font, line.size, line.align);
    })
  }
}

const onHandleText = (ev) => {
  if (ev.keyCode === 13) {
    return ev.target.value = '';
  }
  var currMeme = getCurrMeme();
  const lineCurrMeme = currMeme.lines[currMeme.selectedLineIdx];
  lineCurrMeme.txt = ev.target.value;
  currMeme = getCurrMeme();
  renderMeme(currMeme.selectedImgId)
}

const onFontSizeClicked = (direction) => {
  var currMeme = getCurrMeme();
  const lineCurrMeme = currMeme.lines[currMeme.selectedLineIdx];
  if (direction === 'up') {
    lineCurrMeme.size = lineCurrMeme.size + 5;
  } else {
    lineCurrMeme.size = lineCurrMeme.size - 5;
  }
  renderMeme(currMeme.selectedImgId)
}

const onChangeAlign = (align) => {
  var currMeme = getCurrMeme();
  const lineCurrMeme = currMeme.lines[currMeme.selectedLineIdx];
  if (align === 'right') {
    lineCurrMeme.align = 'left';
  } else if (align === 'left') {
    lineCurrMeme.align = 'right';
  } else {
    lineCurrMeme.align = 'center';
  }
  console.log('currMeme', currMeme);
  renderMeme(currMeme.selectedImgId)
}

const onSetFont = (font) => {
  console.log('gCtx.font', gCtx.font);
  var currMeme = getCurrMeme();
  const lineCurrMeme = currMeme.lines[currMeme.selectedLineIdx];
  if (font === 'impact') {
    lineCurrMeme.font = 'impact';
  } else if (font === 'ariel') {
    lineCurrMeme.font = 'ariel';
  }
  renderMeme(currMeme.selectedImgId);

}

const onChangeFontColor = (value) => {
  var currMeme = getCurrMeme();
  const lineCurrMeme = currMeme.lines[currMeme.selectedLineIdx];
  lineCurrMeme.color = value;
  renderMeme(currMeme.selectedImgId);
}

const onDeleteLine = () => {
  var currMeme = getCurrMeme();
  deleteLine(gCurrMeme.selectedLineIdx);
  renderMeme(currMeme.selectedImgId);
  resetInputs();
}

const onSwitchLine = (direction) => {
  switchLine(direction);
  resetInputs();
}

const onAddLine = () => {
  addLine();
  resetInputs();
}

const renderCanvas = () => {
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');
}

const resetInputs = () => {
  var elInputColor = document.querySelector('.input-color');
  elInputColor.value = '#000000';
  var elInputText = document.querySelector('.text-line');
  elInputText.value = '';
}

const onDeleteAll = () => {
  var currMeme = getCurrMeme();
  deleteAll();
  // currMeme = getCurrMeme()
  renderMeme(currMeme.selectedImgId);
  resetInputs();
}

const onMemsOpen = () => {
  const elMems = document.querySelector('.save-mems-container');
  const elContent = document.querySelector('.main-content');
  const elEditor = document.querySelector('.meme-editor-modal-container');
  elContent.style.display = 'none';
  elEditor.classList.remove('visible');
  elMems.style.display = 'block';
  updatePage('mems');
  console.log('gCuurPage', gCuurPage);

  var mems = loadFromStorage(KEY);
  renderMemes(mems);
}

const onHandleChangeSearch = (ev) => {
  filterGalleryImg(ev.target.value);
}

const toggleMenu = () => {
  document.body.classList.toggle('open-menu');
}

const onSave = () => {
  gMems.push(gElCanvas.toDataURL());
  _saveToLocalStorage();
  onMemsOpen();
}

const searchWord = (value) => {
  if (value.innerHTML === 'actor') {
    gCountActor++;
    var elActor = document.querySelector('.actor-keywords');
    elActor.style.fontSize = 16 + (gCountActor * 5) + 'px';
    filterGalleryImg('actor');
  } else if (value.innerHTML === 'baby') {
    gCountBaby++;
    var elBaby = document.querySelector('.baby-keywords');
    elBaby.style.fontSize = 16 + (gCountBaby * 5) + 'px';
    filterGalleryImg('baby');
  } else if (value.innerHTML === 'pets') {
    gCountpets++;
    var elpets = document.querySelector('.pets-keywords');
    elpets.style.fontSize = 16 + (gCountpets * 5) + 'px';
    filterGalleryImg('pets');
  } else if (value.innerHTML === 'funny') {
    gCountFunny++;
    var elFunny = document.querySelector('.funny-keywords');
    elFunny.style.fontSize = 16 + (gCountFunny * 5) + 'px';
    filterGalleryImg('funny');
  }
}

const renderMemes = (mems) => {
  const strHTMLS = mems.map(mem => {
    console.log('mem', mem);
    return `
      <img src="${mem}" class="mems-img">
    `
  }).join(' ');
  const elMems = document.querySelector('.save-mems-container');
  elMems.innerHTML = strHTMLS;
}

const downloadCanvas = (elLink) => {
  const data = gElCanvas.toDataURL()
  elLink.href = data;
  console.log('elLink.href', elLink.href);
  elLink.download = 'my-canvas';
}
