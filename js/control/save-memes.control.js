'use strict'


function inMeme(){
    readerMeme()
}

function readerMeme(){
    const memes = loadFromStorage('memesDB')
    let gallHTML = ''
    if(!memes) gallHTML = 'no meme saved'
    else memes.forEach((meme, index) => {gallHTML +=
        ` <img src="${meme.imgContent}" alt="#" onclick="onMeme('${meme.imgURL}', ${index})">`
    })

    document.querySelector('.img-gallery').innerHTML = gallHTML
}

function onMeme(imgURL, memeIndex){
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    loadMeme(imgURL, memeIndex)
}