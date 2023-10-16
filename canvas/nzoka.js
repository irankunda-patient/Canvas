const board = document.querySelector("#board")
const ctx = board.getContext("2d")

const boxSize = 25
const rows = 20
const cols = 20
let nzokaX =  boxSize * 5
let nzokaY =  boxSize * 5
let foodX = boxSize * 8
let foodY = boxSize * 8
let nzokaMoveX = 0
let nzokaMoveY = 0
const nzokaBody =[]

window.onload = function () {
    board.width = cols * boxSize
    board.height = rows * boxSize

    randFood()
    window.addEventListener("keyup", nzokaMove)
    // update()
    console.log(setInterval(update, 1000/10));
}
function update(){
    paintBoard()
    ctx.fillStyle = "grey"
    ctx.fillRect(0, 0, board.width, board.height)
    drawLines()
    nzokaPaint()
    foodPaint()
    collDetect()

}
function drawLines(){
    for(let i = 0; i < board.width; i+=boxSize){
        // console.log(i);
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 0.6
        ctx.moveTo(i, 0)
        ctx.lineTo(i,board.width)
        ctx.stroke()
    }
    for(let i = 0; i < board.height; i+=boxSize){
        ctx.beginPath()
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 0.6
        ctx.moveTo(0, i)
        ctx.lineTo(board.width,i)
        ctx.stroke()
    }
}
function paintBoard(){
    ctx.fillStyle = "grey"
    ctx.fillRect(0, 0, board.width, board.height)
}
function foodPaint(){
    ctx.fillStyle = "orange"
    ctx.fillRect(foodX, foodY, boxSize, boxSize)
}
function nzokaPaint(){
    ctx.fillStyle = "lime"
    ctx.fillRect(nzokaX, nzokaY, boxSize, boxSize)
    nzokaX += nzokaMoveX * boxSize
    nzokaY += nzokaMoveY * boxSize

    for(let i = 0; i < nzokaBody.length; i++){
        ctx.fillRect(nzokaBody[i][0], nzokaBody[i][1], boxSize, boxSize)
    }
// not really good
    for(let i = nzokaBody.length -1; i > 0; i--){
        nzokaBody[i] = nzokaBody[i-1]
    }
    if(nzokaBody.length){
        nzokaBody[0] = [nzokaX,nzokaY]
    }
    
}
function randFood(){
    foodX = Math.floor(Math.random() * cols) * boxSize
    foodY = Math.floor(Math.random() * cols) * boxSize
}
function nzokaMove(e){
    let key = e.code
    console.log(key);
    switch (key) {
        case "KeyK":
            if(key == "KeyK" && nzokaMoveY != -1){
                nzokaMoveX = 0
                nzokaMoveY = 1
            }
            break;
            case "KeyI":
                if (!nzokaMoveY == 1) {
                    nzokaMoveX = 0
                    nzokaMoveY = -1
                }
                break;
        case "KeyL":
            if( key == "KeyL" && nzokaMoveX != -1){
                nzokaMoveX = 1
                nzokaMoveY = 0
            }
            break;
        case "KeyJ":
            if(!nzokaMoveX == 1){
                nzokaMoveX = -1
                nzokaMoveY = 0
            }
            break;
    }
}
function collDetect(){
    if(nzokaX == foodX && nzokaY == foodY){
    
        nzokaBody.push([foodX, foodY])
        // console.log(nzokaBody)
        randFood()
    }
    if(nzokaX > board.width || nzokaY > board.height){
        nzokaX += (board.width - nzokaY)
        nzokaY -= (board.height + nzokaX)
    }
}