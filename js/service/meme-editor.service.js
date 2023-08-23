'use strict'

const gMemes = []
const gMeme = {
    img: `<img src="img/1.jpg" alt="#" onclick="onImg(this)"></img>`,
    text: [
        {id: 1, txt:'Funny Text', color: 'black', size: 40, font: 'Arial', align: 'center', pos: {x:200, y:200}}
    ]
}


function getMeme(){
    return gMeme
}

function updateCurrMemeImg(elImg){
    gMeme.img = elImg
}

function updateCurrMemeTxt(txt){
    gMeme.text[0].txt = txt
}

function updateCurrMemeTxtSize(inc){
    gMeme.text[0].size += inc
}

function updateCurrMemeTxtAlign(align){
    gMeme.text[0].align = align
}

function updateCurrMemeTxtColor(color){
    gMeme.text[0].color = color
}

function updateCurrMemeTxtFont(font){
    gMeme.text[0].font = font
}