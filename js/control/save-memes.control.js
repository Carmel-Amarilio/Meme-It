'use strict'


function inMeme(){
    readerMeme()
}

function readerMeme(){
    const memes = loadFromStorage('memesDB')
    console.log(memes);
    if(!memes) return
    let gallHTML = ''
    memes.forEach((meme, index) => {gallHTML +=
        ` <img src="${meme.imgContent}" alt="#" onclick="onMeme(this, ${index})">`
    })

    document.querySelector('.img-gallery').innerHTML = gallHTML
}

function onMeme(elImg, memeIndex){
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    loadMeme(elImg, memeIndex)
}