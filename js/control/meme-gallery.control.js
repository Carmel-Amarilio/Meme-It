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

    const keywords = getKeywords()
    let filterHTML = `<option value="">All</option>`
    keywords.forEach(word => {filterHTML +=
        `<option value="${word}">${word}</option>`
    })
    document.querySelector('.filter').innerHTML = filterHTML

    const commonWords = getCommonWord()
    let commonWordsHTML = ''
    commonWords.forEach((word) => {commonWordsHTML +=
        `<span onclick="filter('${word[0]}')" style="font-size: ${word[1]*2+16}px;">${word[0]}</span>`
    })
    document.querySelector('.common-words').innerHTML = commonWordsHTML
    
}

function onSetFilter(elFilter){
    const val = elFilter.value
    filterBay(val)
    ReaderGall()
    document.querySelector('.filter').value = val
}
function filter(word){
    filterBay(word)
    ReaderGall()
}

function onRandMeme() {
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(1, imgs.length)
    const url = `img/${randNum}.jpg`
    onImg(url)
    getRandText()
}


function onGallery(){
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119)'
    document.querySelector('.gallery').style.backgroundColor = 'rgb(70, 70, 70)'

    document.querySelector('.main-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.remove('closed')
    document.querySelector('.filter-sec').classList.remove('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    onInIt()
}

function onMemes(){
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(70, 70, 70)'

    document.querySelector('.main-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    document.querySelector('.filter-sec').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    inMeme()
}

function onImg(imgURL) {
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119)'

    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.main-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    inEditor(imgURL)
}

function onUploadImg(img){
    onImg(img.src)
}

function toggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open');
}