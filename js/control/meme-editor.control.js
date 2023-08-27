'use strict'

let gCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gCurrTxt = { isMove: false, id: 0 }

function initEditor(imgURL) {
    gCurrTxt.id =  0 
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    resatMeme()
    addListeners()
    updateCurrMemeImg(imgURL)
    resizeCanvas()
    updateTools()
}

function loadMeme(imgURL, memeIndex) {
    initEditor(imgURL)
    loadTxtMeme(memeIndex)
    openMeme()
    updateTools()
}
function getRandLine() {
    loadRandLine()
    openMeme()
    updateTools()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    gCanvas.width = elContainer.clientWidth
    openMeme()
}

function openMeme() {
    const meme = getMeme()
    const img = new Image();
    img.src = meme.imgURL;
    img.onload = function () {
        gCanvas.height = (img.naturalHeight / img.naturalWidth * gCanvas.width)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.line.forEach(line => drawLine(line))
        addBorderToTxt()
    };
}

function drawLine({ txt, color, colorAround, inc, font, align, pos }) {

    const size = gCanvas.width / 11 * inc
    gCtx.fillStyle = color
    gCtx.strokeStyle = colorAround
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, pos.x + gCanvas.width / 2, pos.y * gCanvas.height / 5)
    gCtx.strokeText(txt, pos.x + gCanvas.width / 2, pos.y * gCanvas.height / 5)
}

function addBorderToTxt() {
    const meme = getMeme()
    if (!meme.line.length) return
    const { txt, inc, pos } = meme.line[gCurrTxt.id]
    const size = gCanvas.width / 11 * inc
    const boxSizeX = (txt.length * size )
    const boxSizeY = size
    gCtx.strokeRect(pos.x + gCanvas.width / 2 - (boxSizeX / 2), (pos.y * gCanvas.height / 5) - size / 2, boxSizeX, boxSizeY)
    console.log(boxSizeX, txt.length , size);
}

function onSetTxt(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.input-txt')
    updateCurrMemeTxt(elInput.value, gCurrTxt.id)
    openMeme()
}

function onCurrTxt() {
    const meme = getMeme()
    if (meme.line.length - 1 <= gCurrTxt.id) gCurrTxt.id = 0
    else gCurrTxt.id++
    updateTools()
    openMeme()
}
function onAddTxt(txt) {
    const meme = getMeme()
    gCurrTxt.id = meme.line.length
    addTxt(txt)
    updateTools()
    openMeme()
}

function onDeleteTxt() {
    deleteTxt(gCurrTxt.id)
    gCurrTxt.id = 0
    updateTools()
    openMeme()
}

function onIncTxt(inc) {
    updateCurrMemeTxtSize(inc, gCurrTxt.id)
    openMeme()
}

function onAlignTxt(align) {
    updateCurrMemeTxtAlign(align, gCurrTxt.id)
    openMeme()
}

function onColorTxt(color) {
    updateCurrMemeTxtColor(color, gCurrTxt.id)
    openMeme()
}
function onColorTxtAround(color) {
    updateCurrMemeTxtColorAround(color, gCurrTxt.id)
    openMeme()
}

function onSetFont(elFont) {
    updateCurrMemeTxtFont(elFont.value, gCurrTxt.id)
    openMeme()
}

function onEmoji(emoji) {
    onAddTxt(emoji)
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    document.body.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const txtId = getTxtByPos(pos)
    if (!txtId) return
    gCurrTxt.id = txtId - 1
    gCurrTxt.isMove = true
    updateTools()
    openMeme()

}
function onMove(ev) {
    if (!gCurrTxt.isMove) return
    const pos = getEvPos(ev)
    pos.x = pos.x - gCanvas.width / 2
    pos.y = (pos.y / gCanvas.height / 5) * 25
    updateCurrMemeTxtPos(gCurrTxt.id, pos)
    updateTools()
    openMeme()

}

function onUp() {
    gCurrTxt.isMove = false
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getTxtByPos(pos) {
    const meme = getMeme()
    let index = false
    meme.line.forEach((txt, i) => {
        const txtPosX = txt.pos.x + gCanvas.width
        const txtPosY = txt.pos.y * gCanvas.height / 5 + txt.inc + 20
        if (pos.x < txtPosX && pos.y < txtPosY && pos.y > txtPosY - 57) index = i + 1
    });
    return index
}

function updateTools() {
    const meme = getMeme()
    if (!meme.line.length) return
    const { txt, color, colorAround, font } = meme.line[gCurrTxt.id]
    document.querySelector('.color-text').value = color
    document.querySelector('.color-text-around').value = colorAround
    document.querySelector('.set-font').value = font
    const elInput = document.querySelector('.input-txt')
    elInput.value = txt 
    console.log();
    elInput.focus()
    elInput.select()
}

function onSaveMeme() {
    removeBorder()
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    saveMeme(imgContent)
    openModal('Meme saved')
}

function downloadImg(elLink) {
    removeBorder()
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
    openModal('Download meme')
}

function removeBorder() {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.imgURL
    gCtx.drawImage(img, 0, 0,gCanvas.width, gCanvas.height)
    meme.line.forEach(line => drawLine(line))
}