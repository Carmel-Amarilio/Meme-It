'use strict'


function inMeme(){
    readerMeme()
}

function readerMeme(){
    const memes = loadFromStorage('memesDB')
    let gallHTML = ''
    if(!memes||memes.length === 0) gallHTML = 'no meme saved'
    else memes.forEach((meme, index) => {gallHTML +=
        `<div >
        <img src="${meme.imgContent}" alt="#" onclick="onMeme('${meme.imgURL}', ${index})">
        <button onclick="onDeleteMeme(${index})" class="delete-Meme"><i class="fa-solid fa-trash"></i></i></button>
        </div>
        `
    })

    document.querySelector('.img-gallery').innerHTML = gallHTML
}

function onDeleteMeme(index) {
    const memes = loadFromStorage('memesDB')
    memes.splice(index, 1)
    saveToStorage('memesDB', memes)
    readerMeme()
    openModal('Meme Deleted')
}

function onMeme(imgURL, memeIndex){
    removeNavBackground()
    openElements(['meme-editor'])
    closeElements(['main-gallery', 'file-input', 'main-about'])
    loadMeme(imgURL, memeIndex)
}