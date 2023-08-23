'use strict'


function onInIt() {
    ReaderGall()
}

function ReaderGall() {
    const imgs = getImgs()
    let gallHTML = ''
    imgs.forEach(img => {gallHTML +=
        ` <img src="${img.url}" alt="#" onclick="onImg(this)">`
    })

    document.querySelector('.img-gallery').innerHTML = gallHTML
}


function onGallery(){
    document.querySelector('.img-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.remove('closed')
    document.querySelector('.meme-editor').classList.add('closed')
}

function toggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open');
}