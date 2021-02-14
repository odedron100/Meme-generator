'use strict';

var gCurrMeme;
var gMems;
var gCuurPage = 'gallery';
var gCountBaby = 1;
var gCountpets = 1;
var gCountFunny = 1;
var gCountActor = 1;

const gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['president', 'trump'] },
  { id: 2, url: 'img/2.jpg', keywords: ['pets', 'kiss', 'dog'] },
  { id: 3, url: 'img/3.jpg', keywords: ['baby', 'pets', 'dog', 'sleep'] },
  { id: 4, url: 'img/4.jpg', keywords: ['pets', 'cat', 'sleep'] },
  { id: 5, url: 'img/5.jpg', keywords: ['baby', 'happy', 'funny'] },
  { id: 6, url: 'img/6.jpg', keywords: ['actor', 'explain'] },
  { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprised'] },
  { id: 8, url: 'img/8.jpg', keywords: ['listening'] },
  { id: 9, url: 'img/9.jpg', keywords: ['cunning', 'funny', 'baby'] },
  { id: 10, url: 'img/10.jpg', keywords: ['president', 'obama'] },
  { id: 11, url: 'img/11.jpg', keywords: ['fight', 'kiss'] },
  { id: 12, url: 'img/12.jpg', keywords: ['serius', 'tv'] },
  { id: 13, url: 'img/13.jpg', keywords: ['actor', 'leonardo de caprio'] },
  { id: 14, url: 'img/14.jpg', keywords: ['serius', 'glasses'] },
  { id: 15, url: 'img/15.jpg', keywords: ['actor', 'game of thrones'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
  { id: 17, url: 'img/17.jpg', keywords: ['president', 'potin'] },
  { id: 18, url: 'img/18.jpg', keywords: ['toy', 'movie'] },
]
var gCurrImg;

const createNewImg = (id, url) => {
  var newImg = {
    id,
    url
  }
  gImgs.push(newImg);
  updateCurrMeme(id);
}

const getImgs = () => {
  return gImgs;
}

const getCurrMeme = () => {
  return gCurrMeme;
}

const getCurrImgById = (imgId) => {
  return gImgs.find(img => {
    return img.id === imgId;
  })
}


const drawText = (txt, x = 200, y = 50, color = 'white', font = 'impact', size = 50, align = 'center') => {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'red'
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`
  gCtx.textAlign = align;
  gCtx.fillText(txt, x, y)
  // gCtx.strokeText(txt, x, y)
}


const updateCurrMeme = (imgId, lineIdx = 0, txt = '', size = 50, font = 'impact', align = 'center', color = 'white') => {
  gCurrMeme = {
    selectedImgId: imgId,
    selectedLineIdx: lineIdx,
    lines: [
      { txt, size, font, align, color, x: 200, y: 50 },
      { txt, size, font, align, color, x: 200, y: 450 }
    ]
  }
}

const deleteLine = () => {
  if (gCurrMeme.lines.length > 1 && gCurrMeme.selectedLineIdx > 0) {
    gCurrMeme.lines.splice(gCurrMeme.selectedLineIdx, 1);
    gCurrMeme.selectedLineIdx--;
  } else {
    updateCurrMeme(gCurrMeme.selectedImgId);
  }
}

const deleteAll = () => {
  updateCurrMeme(gCurrMeme.selectedImgId);
}

const switchLine = (direction) => {
  if (direction === 'up') {
    if (gCurrMeme.selectedLineIdx === 0) return;
    gCurrMeme.selectedLineIdx--;
  } else if (direction === 'down') {
    gCurrMeme.selectedLineIdx++;
    if (gCurrMeme.selectedLineIdx === gCurrMeme.lines.length) {
      gCurrMeme.selectedLineIdx = gCurrMeme.lines.length - 1;
    }
  }
}

const addLine = (txt = '', size = 50, font = 'impact', align = 'center', color = 'white') => {
  gCurrMeme.lines.splice(gCurrMeme.selectedLineIdx + 1, 0,
    { txt, size, font, align, color, x: 200, y: 50 * gCurrMeme.lines.length },
  )
  gCurrMeme.selectedLineIdx++;
}

const filterGalleryImg = (value) => {
  searchWord(value);
  const filteredImgRes = gImgs.filter(img => {
    const keyword = img.keywords.filter(keyword => {
      return keyword.includes(value);
    })
    if (keyword.length > 0) return keyword;
  })
  renderGallery(filteredImgRes);
}

function _saveToLocalStorage() {
  saveToStorage(KEY, gMems);
}

const createMems = () => {
  var mems = loadFromStorage(KEY);
  if (!mems || !mems.length) {
    mems = []
  }
  gMems = mems;
  _saveToLocalStorage();
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


const updatePage = (currPage) => {
  var elGallery = document.querySelector('.gallery');
  var elMems = document.querySelector('.mems');
  console.log('elMems', elMems);
  console.log('elGallery', elGallery);
  gCuurPage = currPage;
  if (gCuurPage === 'gallery') {
    elGallery.style.color = 'white'
    elGallery.style.fontSize = '28' + 'px';
    elMems.style.color = 'black'
    elMems.style.fontSize = '22' + 'px';
  } else if (gCuurPage === 'mems') {
    elMems.style.color = 'white'
    elMems.style.fontSize = '28' + 'px';
    elGallery.style.color = 'black'
    elGallery.style.fontSize = '22' + 'px';
  }
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData
  })
    .then(function (res) {
      return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err)
    })
}

function getClickedLineIdx(clickedPos) {
  const idx = gMeme.lines.findIndex((ln) => {
    let offset = 0;
    const { pos, align, width, size } = ln;
    if (align === 'left') offset = width / 2;
    else if (align === 'right') offset = -width / 2;

    return (
      pos.x - width / 2 + offset < clickedPos.x &&
      pos.x + width / 2 + offset > clickedPos.x &&
      pos.y - size - 5 < clickedPos.y &&
      pos.y + 15 > clickedPos.y
    );
  });
  return idx;
}

function geClickedStickerIdx(clickedPos) {
  const idx = gMeme.stickers.findIndex((sticker) => {
    const { pos, width, height } = sticker;
    return pos.x < clickedPos.x && pos.x + width > clickedPos.x && pos.y < clickedPos.y && pos.y + height > clickedPos.y;
  });
  return idx;
}
