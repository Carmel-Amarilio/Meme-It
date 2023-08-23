'use strict'

const gMemes = []
const gMeme = {
    img: `<img src="img/1.jpg" alt="#" onclick="onImg(this)"></img>`,
    text: [
        {id: 1, txt:'Funny Text', color: 'black', inc: 0, font: 'Arial', align: 'center', pos: {x:0, y:0}}
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
    gMeme.text[0].inc += inc
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
function updateCurrMemeTxtPos(index, pos){
    gMeme.text[index].pos.x = pos.x
    gMeme.text[index].pos.y = pos.y
}