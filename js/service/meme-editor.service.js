'use strict'

let gMeme = {}

function resatMeme() {
    gMeme = {
        line: [
            { txt: 'Funny Text', color: '#ffffff', colorAround: '#000000', inc: 1, font: 'Impact', align: 'center', pos: { x: 0, y: .5} },
            { txt: 'Funny Text', color: '#ffffff', colorAround: '#000000', inc: 1, font: 'Impact', align: 'center', pos: { x: 0, y: 4.5} }
        ]
    }
}
function loadTxtMeme(memeIndex){
    const memes = loadFromStorage('memesDB')
    gMeme.line = memes[memeIndex].line
}

function loadRandLine() {
    const {txt1, txt2} = getFunnyTxt()
    gMeme.line[0].txt =txt1
    gMeme.line[1].txt =txt2
    gMeme.line[0].inc = 0.5
    gMeme.line[1].inc = 0.5
}

function getMeme() {
    return gMeme
}

function addTxt(txt = 'Funny Text') {
    const newTxt = { txt, color: '#ffffff', colorAround: '#000000' ,inc: 1, font: 'Impact', align: 'center', pos: { x: 0, y: 2} }
    gMeme.line.push(newTxt)
}

function deleteTxt(index) {
    gMeme.line.splice(index, 1)
}

function updateCurrMemeImg(imgURL) {
    gMeme.imgURL = imgURL
}

function updateCurrMemeTxt(txt, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].txt = txt
}

function updateCurrMemeTxtSize(inc, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].inc += inc
}

function updateCurrMemeTxtAlign(align, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].align = align
}

function updateCurrMemeTxtColor(color, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].color = color
}
function updateCurrMemeTxtColorAround(color, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].colorAround = color
}

function updateCurrMemeTxtFont(font, index) {
    if (gMeme.line.length <= 0) return
    gMeme.line[index].font = font
}
function updateCurrMemeTxtPos(index, pos) {
    gMeme.line[index].pos.x = pos.x
    gMeme.line[index].pos.y = pos.y
}

function saveMeme(imgContent) {
    gMeme.imgContent = imgContent
    let memes
    memes = (!loadFromStorage('memesDB')) ? [] : loadFromStorage('memesDB')
    memes.push(gMeme)
    saveToStorage('memesDB', memes)

}