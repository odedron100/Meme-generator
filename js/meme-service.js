'use strict';

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

function getCurrImg(imgId) {
  return gImgs.find(img => {
    return img.id === imgId;
  })
}

// const renderCanvas = () => {
//   gElCanvas = document.getElementById('canvas');
//   gCtx = gElCanvas.getContext('2d');
// }

// function drawImgFromlocal(imgUrl) {
//   console.log('imgUrl', imgUrl);
//   const img = new Image()
//   img.src = './ ' + imgUrl;
//   img.onload = () => {
//     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
//   }
// }

// const renderImg = (img) => {
//   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }


// const updateCurrImg = (img) => {
//   gCurrImg = img;
// }

// const getCurrImg = (img) => {
//   return gCurrImg
// }
