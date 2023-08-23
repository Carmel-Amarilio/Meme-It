'use strict'

let gCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gCurrTxt = { isMove: false, id: 0 }

function inEditor(elImg) {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    addListeners()

    updateCurrMemeImg(elImg)
    resizeCanvas()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    elContainer.style.height = elContainer.clientWidth + 'px'
    gCanvas.width = elContainer.clientWidth
    gCanvas.height = elContainer.clientHeight
    openMeme()
}

function openMeme() {
    const meme = getMeme()
    gCtx.drawImage(meme.img, 0, 0, gCanvas.width, gCanvas.height)
    meme.text.forEach(txt => drawText(txt))
}

function drawText({ txt, color, inc, font, align, pos }) {
    const size = gCanvas.width / 11 + inc

    // const boxSizeX = txt.length * (size/1.8) 
    // const boxSizeY = size
    // gCtx.strokeRect(pos.x+gCanvas.width/2-(boxSizeX/2), pos.y + boxSizeY/2, boxSizeX, boxSizeY)

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, pos.x + gCanvas.width / 2, pos.y + size / 2 + 20)
}

function onSetTxt(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.input-txt')
    if (elInput.value === '') return
    console.log(elInput.value);
    updateCurrMemeTxt(elInput.value, gCurrTxt.id)
    openMeme()
}

function onAddTxt() {
    addTxt()
    openMeme()
}

function onDeleteTxt() {
    deleteTxt(gCurrTxt.id)
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

function onColor(color) {
    updateCurrMemeTxtColor(color, gCurrTxt.id)
    openMeme()
}

function onSetFont(elFont) {
    updateCurrMemeTxtFont(elFont.value, gCurrTxt.id)
    openMeme()
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
}
function onMove(ev) {
    if (!gCurrTxt.isMove) return
    const pos = getEvPos(ev)
    pos.x = pos.x - gCanvas.width / 2
    pos.y = pos.y - 20
    updateCurrMemeTxtPos(gCurrTxt.id, pos)
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
    meme.text.forEach((txt, i) => {
        const txtPosX = txt.pos.x + gCanvas.width
        const txtPosY = txt.pos.y + gCanvas.width / 11 + txt.inc + 20
        if (pos.x < txtPosX && pos.y < txtPosY && pos.y > txtPosY - 57) index = i + 1
    });
    return index
}

function updateTools(){
    const meme = getMeme()
    const {txt, color, font} = meme.text[gCurrTxt.id]
    document.querySelector('.input-txt').value = txt
    document.querySelector('.color-text').value = color
    document.querySelector('.set-font').value = font

}

function onSaveMeme(){
    saveMeme()
}

function downloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}