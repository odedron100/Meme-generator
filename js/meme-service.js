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


const drawText = (txt) => {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'red'
  gCtx.fillStyle = gCurrMeme.lines[gCurrMeme.selectedLineIdx].color;
  gCtx.font = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].size}px Ariel`
  gCtx.textAlign = gCurrMeme.lines[gCurrMeme.selectedLineIdx].align
  gCtx.fillText(txt, 200, 50)
  // gCtx.strokeText(txt, x, y)
}


const updateCurrMeme = (imgId, lineIdx = 0, txt = '', size = 50, align = 'center', color = 'red') => {
  gCurrMeme = {
    selectedImgId: imgId,
    selectedLineIdx: lineIdx,
    lines: [{ txt, size, align, color }]
  }
}
