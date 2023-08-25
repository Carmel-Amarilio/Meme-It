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
    const memes = loadFromStorage('memesDB');
    memes.splice(index, 1);
    saveToStorage('memesDB', memes);
    readerMeme()
}

function onMeme(imgURL, memeIndex){
    document.querySelector('.gallery').style.backgroundColor = 'rgb(106, 114, 119, 0)'
    document.querySelector('.memes').style.backgroundColor = 'rgb(106, 114, 119, 0)'
    document.querySelector('.about').style.backgroundColor = 'rgb(106, 114, 119, 0)'

    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.main-gallery').classList.add('closed')
    document.querySelector('.file-input').classList.add('closed')
    document.querySelector('.main-about').classList.add('closed')
    loadMeme(imgURL, memeIndex)
}