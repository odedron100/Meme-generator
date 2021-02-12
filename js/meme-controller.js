'use strict';
var gElCanvas;
var gCtx;
var KEY = 'mems';

const init = () => {
  renderGallery();
  renderCanvas();
  createMems();

  const elEditor = document.querySelector('.meme-editor-modal-container');
  elEditor.addEventListener('click', (e) => {
    if (e.target === elEditor) {
      openGallery();
    }
  });
  // const elEditor = document.querySelector('.meme-editor-modal-container');
  // elEditor.addEventListener('click', (e) => {
  //   if (e.target === elEditor) {
  //     openGallery();
  //   }
  // });
}

const renderGallery = (imgsAfterSearch) => {
  let imgs = getImgs();
  if (imgsAfterSearch) {
    imgs = imgsAfterSearch;
  }
  console.log('imgs', imgs);
  const strHTMLS = imgs.map(img => {

    // return `
    //   <img src="img/${img.id}.jpg" onclick="onImgClicked(${img.id})">
    // `

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
  // elEditor.style.display = 'none';
}

function renderMeme(imgId) {
  const currImage = getCurrImgById(imgId);
  const img = new Image();
  img.src = currImage.url;
  img.onload = () => {
    var currMeme = getCurrMeme();
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach(line => {
      drawText(line.txt, line.x, line.y, line.color, line.font, line.size);
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
