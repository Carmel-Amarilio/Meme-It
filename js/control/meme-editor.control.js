'use strict'

let gCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gMoveTxt = { isMove: false, id: null }

function onImg(elImg) {
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')

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
    drawText(meme.text[0])
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

function onSetLineTxt(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.input-txt')
    if (elInput.value === '') return
    console.log(elInput.value);
    updateCurrMemeTxt(elInput.value)
    openMeme()
}

function onIncTxt(inc) {
    updateCurrMemeTxtSize(inc)
    openMeme()
}

function onAlignTxt(align) {
    updateCurrMemeTxtAlign(align)
    openMeme()
}

function onColor(color) {
    updateCurrMemeTxtColor(color)
    openMeme()
}

function onSetFont(elFont) {
    updateCurrMemeTxtFont(elFont.value)
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
    if (!txtId ) return
        gMoveTxt.id = txtId -1
        gMoveTxt.isMove = true
    
}
function onMove(ev) {
    if (!gMoveTxt.isMove) return
    const pos = getEvPos(ev)
    pos.x = pos.x - gCanvas.width/2
    pos.y = pos.y - 20
    updateCurrMemeTxtPos(gMoveTxt.id, pos)
    openMeme()
}
function onUp() {
    gMoveTxt.isMove = false
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
        console.log(txtPosX, txtPosY)

        if (pos.x < txtPosX && pos.y < txtPosY && pos.y > txtPosY - 57) index = i +1
    });
    return index
}

//{id: 1, txt:'Funny Text', color: 'black', inc: 0, font: 'Arial', align: 'center', pos: {x:0, y:0}}