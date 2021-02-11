'use strict';

var gCurrMeme;

const gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['trump'] },
  { id: 2, url: 'img/2.jpg', keywords: ['trump'] },
  { id: 3, url: 'img/3.jpg', keywords: ['trump'] },
  { id: 4, url: 'img/4.jpg', keywords: ['trump'] },
  { id: 5, url: 'img/5.jpg', keywords: ['trump'] },
  { id: 6, url: 'img/6.jpg', keywords: ['trump'] },
  { id: 7, url: 'img/7.jpg', keywords: ['trump'] },
  { id: 8, url: 'img/8.jpg', keywords: ['trump'] },
  { id: 9, url: 'img/9.jpg', keywords: ['trump'] },
  { id: 10, url: 'img/10.jpg', keywords: ['trump'] },
  { id: 11, url: 'img/11.jpg', keywords: ['trump'] },
  { id: 12, url: 'img/12.jpg', keywords: ['trump'] },
  { id: 13, url: 'img/13.jpg', keywords: ['trump'] },
  { id: 14, url: 'img/14.jpg', keywords: ['trump'] },
  { id: 15, url: 'img/15.jpg', keywords: ['trump'] },
  { id: 16, url: 'img/16.jpg', keywords: ['trump'] },
  { id: 17, url: 'img/17.jpg', keywords: ['trump'] },
  { id: 18, url: 'img/18.jpg', keywords: ['trump'] },
]

var gCurrImg;

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
  console.log('gCurrMeme.selectedLineIdx', gCurrMeme.selectedLineIdx);
  console.log('gCurrMeme.lines', gCurrMeme.lines);
}
