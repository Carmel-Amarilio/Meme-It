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
    toggleMenu()
}

function onImg(elImg) {
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    toggleMenu()
    inEditor(elImg)
}

function toggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open');
}