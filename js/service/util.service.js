'use strict'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function getFunnyTxt(){
    const memeLines = [
        ["When you finally fix a bug", "at 3 AM."],
        ["That moment when your code", "runs perfectly on the first try."],
        ["When you find a solution on Stack Overflow", "and it actually works."],
        ["When the client asks for one more", "'small' feature."],
        ["When your CSS looks great on Chrome but", "falls apart in IE."],
        ["When your code works, but", "you have no idea why."],
        ["When someone asks if you're a", "front-end or back-end developer."],
        ["When the intern fixes a bug", "you've been struggling with for hours."],
        ["When the boss says,", " 'We need to talk aboutcode quality.'"],
        ["When your code compiles with no errors,", "but still doesn't work."], 
        ["That feeling when you finally", "understand a complex algorithm."],
        ["When your code passes all the tests", "except the one your boss runs."],
        ["When your client asks for a feature", "you've already implemented."],
        ["When your design looks pixel-perfect", "on your screen, but not on theirs."],
        ["When you're debugging and find out", "the problem was a missing semicolon."],
        ["When you see a new framework", "and think, 'Not another one!'"],
        ["When you accidentally push your", "personal project to the company's repository."],
        ["When you realize you've been coding", "for hours without a break."],
        ["When you get a code review", "with 100 comments from your senior developer."]
    ]
    const randLines = memeLines[getRandomIntInclusive(0, memeLines.length)]
    const txt1 = randLines[0]
    const txt2 = randLines[1]
    return {txt1, txt2}
}

function isEmptyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function getTop4(data){
    const entries = Object.entries(data)
    entries.sort((a, b) => b[1] - a[1])
    return entries.slice(0, 4)
}