'use strict'

let gCanvas
let gCtx

function onImg(elImg) {
    document.querySelector('.meme-editor').classList.remove('closed')
    document.querySelector('.img-gallery').classList.add('closed')

    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    updateCurrMemeImg(elImg)
    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)
}


function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    elContainer.style.height = elContainer.clientWidth+ 'px'
    gCanvas.width = elContainer.clientWidth 
    gCanvas.height = elContainer.clientHeight 
    openMeme()
}

function openMeme(){
    const meme = getMeme()
    gCtx.drawImage(meme.img, 0, 0, gCanvas.width, gCanvas.height)
    drawText(meme.text[0])
}

function drawText({txt, color, size, font, align, pos}) {
    const boxSize = txt.length* 50
    // gCtx.strokeRect(x-(boxSize/2), y-50, boxSize, 100)
    
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
  
    gCtx.fillText(txt, pos.x, pos.y)
  }

function onSetLineTxt(ev){
    ev.preventDefault()
    const elInput = document.querySelector('.input-txt')
    if (elInput.value === '') return
    console.log(elInput.value);
    updateCurrMemeTxt(elInput.value)
    openMeme()
}

function onIncTxt(inc){
    updateCurrMemeTxtSize(inc)
    openMeme()
}

function onAlignTxt(align){
    updateCurrMemeTxtAlign(align)
    openMeme()
}

function onColor(color){
    updateCurrMemeTxtColor(color)
    openMeme()
}

function onSetFont(elFont){
    updateCurrMemeTxtFont(elFont.value)
    openMeme()
}