'use strict'


function onInIt() {
    renderGall()
    window.addEventListener('resize', renderCommonWord)
}

function renderGall() {
    const imgs = getImgs()
    let gallHTML = ''
    imgs.forEach(img => {
        gallHTML +=
        `<img src="${img.url}" alt="#" onclick="onImg('${img.url}')">`
    })
    document.querySelector('.img-gallery').innerHTML = gallHTML

    const keywords = getKeywords()
    let filterHTML = `<option value="">All</option>`
    keywords.forEach(word => {
        filterHTML +=
        `<option value="${word}">${word}</option>`
    })
    document.querySelector('.filter').innerHTML = filterHTML
    renderCommonWord()
}

function renderCommonWord(ev,isAll = false) {
    const screenWidth = window.innerWidth;

    const commonWords = getCommonWord()
    let commonWordsHTML = ''
    const words = (isAll) ? commonWords.length : screenWidth / 400
    console.log(isAll);
    for (let i = 0; i < words; i++) {
        const word =commonWords[i]
        commonWordsHTML += `<span onclick="filter('${word[0]}')" style="font-size: ${word[1] * 2 + 16}px;">${word[0]}</span>`
    }
    if(!isAll) commonWordsHTML += `<span onclick="renderCommonWord(0,true)">all...</span>`
    document.querySelector('.common-words').innerHTML = commonWordsHTML
}

function onSetFilter(elFilter) {
    const val = elFilter.value
    filterBay(val)
    renderGall()
    document.querySelector('.filter').value = val
}
function filter(word) {
    filterBay(word)
    renderGall()
}

function onRandMeme() {
    filter('')
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(1, imgs.length)
    const url = `img/${randNum}.jpg`
    onImg(url)
    getRandText()
}


function onGallery() {
    document.querySelector('.gallery').style.backgroundColor = 'rgb(70, 70, 70)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119,0)'
    document.querySelector('.about').style.backgroundColor = 'rgb(106, 114, 119,0)'

    document.querySelector('.main-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.remove('closed')
    document.querySelector('.filter-sec').classList.remove('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    document.querySelector('.main-about').classList.add('closed')
    filter('')
    onInIt()
}

function onMemes() {
    document.querySelector('.memes').style.backgroundColor = 'rgb(70, 70, 70)'
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119,0)'
    document.querySelector('.about').style.backgroundColor = 'rgb(106, 114, 119,0)'

    document.querySelector('.main-gallery').classList.remove('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    document.querySelector('.filter-sec').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    document.querySelector('.main-about').classList.add('closed')
    inMeme()
}

function onAbout() {
    document.querySelector('.about').style.backgroundColor = 'rgb(70, 70, 70)'
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119,0)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119,0)'

    document.querySelector('.main-about').classList.remove('closed')
    document.querySelector('.main-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.meme-editor').classList.add('closed')
    document.querySelector('.filter-sec').classList.add('closed')
    document.querySelector('.main-nav-container').classList.add('open');

}

function onImg(imgURL) {
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119, 0)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119, 0)'
    document.querySelector('.about').style.backgroundColor = 'rgb(106, 114, 119, 0)'

    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.main-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.main-nav-container').classList.remove('open');
    document.querySelector('.main-about').classList.add('closed')
    inEditor(imgURL)
}

function onUploadImg(img) {
    onImg(img.src)
}

function toggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open');
}