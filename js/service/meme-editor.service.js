'use strict'

let gMeme = {}

function resatMeme() {
    gMeme = {
        text: [
            { txt: 'Funny Text', color: "#000002", inc: 0, font: 'Arial', align: 'center', pos: { x: 0, y: 0 } },
            { txt: 'Funny Text', color: "#000001", inc: 0, font: 'Arial', align: 'center', pos: { x: 0, y: 300 } }
        ]
    }
}
function loadTxtMeme(memeIndex){
    const memes = loadFromStorage('memesDB')
    console.log(memes[memeIndex].text);
    gMeme.text = memes[memeIndex].text
}

function getMeme() {
    return gMeme
}

function addTxt() {
    const newTxt = { txt: 'Funny Text', color: '#000001', inc: 0, font: 'Arial', align: 'center', pos: { x: 0, y: 200 } }
    gMeme.text.push(newTxt)
}

function deleteTxt(index) {
    gMeme.text.splice(index, 1)
}

function updateCurrMemeImg(elImg) {
    gMeme.img = elImg
}

function updateCurrMemeTxt(txt, index) {
    if (gMeme.text.length <= 0) return
    gMeme.text[index].txt = txt
}

function updateCurrMemeTxtSize(inc, index) {
    if (gMeme.text.length <= 0) return
    gMeme.text[index].inc += inc
}

function updateCurrMemeTxtAlign(align, index) {
    if (gMeme.text.length <= 0) return
    gMeme.text[index].align = align
}

function updateCurrMemeTxtColor(color, index) {
    if (gMeme.text.length <= 0) return
    gMeme.text[index].color = color
}

function updateCurrMemeTxtFont(font, index) {
    if (gMeme.text.length <= 0) return
    gMeme.text[index].font = font
}
function updateCurrMemeTxtPos(index, pos) {
    gMeme.text[index].pos.x = pos.x
    gMeme.text[index].pos.y = pos.y
}

function saveMeme(imgContent) {
    gMeme.imgContent = imgContent
    let memes
    memes = (!loadFromStorage('memesDB')) ? [] : loadFromStorage('memesDB')
    memes.push(gMeme)
    saveToStorage('memesDB', memes)

}