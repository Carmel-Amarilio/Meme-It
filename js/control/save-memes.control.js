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
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119)'

    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.main-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    loadMeme(imgURL, memeIndex)
}