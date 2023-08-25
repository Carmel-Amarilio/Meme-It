'use strict'

let id = 1
let gKeyFilter = ''

const gImgs = [
    { id: id++, url: 'img/1.jpg', keywords: ['funny', 'Trump', 'liders'] },
    { id: id++, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
    { id: id++, url: 'img/3.jpg', keywords: ['funny', 'baby', 'dog'] },
    { id: id++, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: id++, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: id++, url: 'img/6.jpg', keywords: ['funny', 'willy wonka'] },
    { id: id++, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: id++, url: 'img/8.jpg', keywords: ['funny', 'liders'] },
    { id: id++, url: 'img/9.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/10.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/11.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/12.jpg', keywords: ['funny', 'liders'] },
    { id: id++, url: 'img/13.jpg', keywords: ['funny', 'liders'] },
    { id: id++, url: 'img/14.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/15.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/16.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/17.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/18.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/19.jpg', keywords: ['funny',] },
    { id: id++, url: 'img/20.jpg', keywords: ['funny',] },
]
let gKeyWordsMap = loadFromStorage('keyWordsMap')
if(!gKeyWordsMap){
    gKeyWordsMap ={}
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            gKeyWordsMap[word] = 0
        })
    })
} 


function getImgs() {
    const imgs = []
    if (gKeyFilter === '') return gImgs
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            if (word === gKeyFilter) imgs.push(img)
        })
    })
    return imgs
}

function filterBay(keywords) {
    gKeyFilter = keywords
    gKeyWordsMap[keywords]++
    saveToStorage('keyWordsMap', gKeyWordsMap)
}

function getKeywords() {
    const keywords = []
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            if (!keywords.includes(word)) keywords.push(word)
            if (isEmptyObject(gKeyWordsMap)) gKeyWordsMap[word] = 0
        })
    })
    return keywords
}

function getCommonWord() {
    return Object.entries(gKeyWordsMap)
}
