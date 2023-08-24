'use strict'


function onInIt() {
    ReaderGall()
}

function ReaderGall() {
    const imgs = getImgs()
    let gallHTML = ''
    imgs.forEach(img => {gallHTML +=
        `<img src="${img.url}" alt="#" onclick="onImg('${img.url}')">`
    })

    document.querySelector('.img-gallery').innerHTML = gallHTML
}

function onRandMeme() {
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(0, imgs.length)
    const url = `img/${randNum}.jpg`
    const img = `<img src="${url}" alt="#"">`
    console.log(img);
    onImg(url)
    getRandText()
}


function onGallery(){
    document.querySelector('.img-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.remove('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    toggleMenu()
    onInIt()
}

function onMemes(){
    document.querySelector('.img-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    toggleMenu()
    inMeme()
}

function onImg(imgURL) {
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    toggleMenu()
    inEditor(imgURL)
}

function toggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open');
}