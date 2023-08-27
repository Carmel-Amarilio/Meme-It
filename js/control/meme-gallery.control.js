'use strict'


function onInit() {
    renderGall()
    window.addEventListener('resize', renderCommonWord)
    document.querySelector('.gallery').style.backgroundColor = 'rgb(70, 70, 70)'
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

function renderCommonWord(ev, isAll = false) {
    const screenWidth = window.innerWidth

    const commonWords = getCommonWord()
    let commonWordsHTML = ''
    const words = (isAll) ? commonWords.length : screenWidth / 400
    for (let i = 0; i < words; i++) {
        const word = commonWords[i]
        if (word[0] === '') continue
        commonWordsHTML += `<span onclick="filter('${word[0]}')" style="font-size: ${word[1] * 2 + 16}px;">${word[0]}</span>`
    }
    if (!isAll) commonWordsHTML += `<span onclick="renderCommonWord(0,true)">all...</span>`
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
    document.querySelector('.filter').value = word
}

function onRandMeme() {
    filter('')
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(1, imgs.length)
    const url = `img/${randNum}.jpg`
    onImg(url)
    getRandLine()
}


function onGallery() {
    removeNavBackground()
    document.querySelector('.gallery').style.backgroundColor = 'rgb(70, 70, 70)'
    openElements(['main-gallery', 'file-input', 'filter-sec'])
    closeElements(['meme-editor-container', 'main-about'])
    closedBar()
    filter('')
    onInit()
}

function onMemes() {
    removeNavBackground()
    document.querySelector('.memes').style.backgroundColor = 'rgb(70, 70, 70)'
    openElements(['main-gallery'])
    closeElements(['file-input', 'meme-editor-container', 'filter-sec', 'main-about'])
    closedBar()
    inMeme()
}

function onAbout() {
    removeNavBackground()
    document.querySelector('.about').style.backgroundColor = 'rgb(70, 70, 70)'
    openElements(['main-about'])
    closeElements(['main-gallery', 'file-input', 'meme-editor-container', 'filter-sec'])
    closedBar()

}

function onImg(imgURL) {
    removeNavBackground()
    openElements(['meme-editor-container'])
    closeElements(['main-gallery', 'file-input', 'main-about'])
    closedBar()
    initEditor(imgURL)
}

function onUploadImg(img) {
    onImg(img.src)
}

function onToggleMenu() {
    document.querySelector('.main-nav-container').classList.toggle('open')
}

function closedBar() {
    document.querySelector('.main-nav-container').classList.remove('open')
}

function removeNavBackground() {
    const elLis = document.querySelectorAll('li')
    elLis.forEach(li => li.style.backgroundColor = 'rgb(106, 114, 119,0)')
}

function closeElements(elements) {
    elements.forEach(el => document.querySelector(`.${el}`).classList.add('closed'))
}
function openElements(elements) {
    elements.forEach(el => document.querySelector(`.${el}`).classList.remove('closed'))
}

function openModal(txt) {
    const elModal = document.querySelector('.modal')
    elModal.innerText = txt
    elModal.classList.add('show')
    setTimeout(() => { elModal.classList.remove('show') }, 1000)
}