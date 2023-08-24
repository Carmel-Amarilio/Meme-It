'use strict'

let gMeme = {}

function resatMeme() {
    gMeme = {
        text: [
            { txt: 'Funny Text', color: '#176ED2', inc: 0, font: 'Arial', align: 'center', pos: { x: 0, y: 0 } },
            { txt: 'Funny Text', color: '#176ED2', inc: 0, font: 'Arial', align: 'center', pos: { x: 0, y: 300 } }
        ]
    }
}
function loadTxtMeme(memeIndex){
    const memes = loadFromStorage('memesDB')
    gMeme.text = memes[memeIndex].text
}

function loadRandText() {
    const {txt1, txt2} = getFunnyTxt()
    gMeme.text[0].txt =txt1
    gMeme.text[1].txt =txt2
    gMeme.text[0].inc =-15
    gMeme.text[1].inc =-15
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

function updateCurrMemeImg(imgURL) {
    gMeme.imgURL = imgURL
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