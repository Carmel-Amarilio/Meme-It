'use strict'

const gMeme = {
    img: `<img src="img/1.jpg" alt="#" onclick="onImg(this)"></img>`,
    text: [
        { txt:'Funny Text', color: 'black', inc: 0, font: 'Arial', align: 'center', pos: {x:0, y:0}}
    ]
}


function getMeme(){
    return gMeme
}

function addTxt(){
    const newTxt = { txt:'Funny Text', color: 'black', inc: 0, font: 'Arial', align: 'center', pos: {x:0, y:200}}
    gMeme.text.push(newTxt)
}

function deleteTxt(index){
    gMeme.text.splice(index,1)
}

function updateCurrMemeImg(elImg){
    gMeme.img = elImg
}

function updateCurrMemeTxt(txt, index){
    if(gMeme.text.length<=0)return
    gMeme.text[index].txt = txt
}

function updateCurrMemeTxtSize(inc, index){
    if(gMeme.text.length<=0)return
    gMeme.text[index].inc += inc
}

function updateCurrMemeTxtAlign(align, index){
    if(gMeme.text.length<=0)return
    gMeme.text[index].align = align
}

function updateCurrMemeTxtColor(color, index){
    if(gMeme.text.length<=0)return
    gMeme.text[index].color = color
}

function updateCurrMemeTxtFont(font, index){
    if(gMeme.text.length<=0)return
    gMeme.text[index].font = font
}
function updateCurrMemeTxtPos(index, pos){
    gMeme.text[index].pos.x = pos.x
    gMeme.text[index].pos.y = pos.y
}

function saveMeme(){
    let memes = loadFromStorage('memesDB')
    if (!memes)memes=[]
    memes.push(gMeme)
    saveToStorage('memesDB', gMeme)
}