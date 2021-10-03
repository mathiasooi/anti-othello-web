var board = []
// Black 0
// White 1
// Green -1
var player_color = Math.floor(Math.random() * 2)
var swap_color = {1: 0, 0: 1}
var score_w = 0
var score_b = 0

function init() {
    // Add circles to board
    for (let i = 0; i < 64; ++i) {
        var x = document.createElement("div");
        var y = document.createElement("div");
        x.className = "box"
        y.className = "circle green"
        x.appendChild(y)
        y.id = i
        y.addEventListener("click", selectTile)
        document.getElementById("container").append(x)
    }

    // Init board
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            board.push(-1)
        }
    }
    changeColor(28, 0)
    changeColor(35, 0)
    changeColor(27, 1)
    changeColor(36, 1)
}

function selectTile(elem) {
    // TODO Check for turn state
    elem = elem.path[0]
    changeColor(elem.id, player_color)

    getCord(elem.id)

    // Flippy flippy
    flip(elem.id)
}

function onBoard(x, y) {
    // Check if cordinate is on the board
    return (0 <= x && x <= 7 && 0 <= y && y <= 7)
}

function flip(id) {
    var elem = document.getElementById(id)
    var x = getCord(id)[0], y = getCord(id)[1]
    console.log(x, y)
    var color = board[x, y]
    var opp = swap_color[color]
    for (let dx = -1; dx < 2; ++dx) {
        for (let dy = -1; dy < 2; ++dy) {
            if (!(dx || dy)) {continue;}
            console.log(dx, dy)
            var nx = x, ny = y; 
            nx += dx
            ny += dy
            if (onBoard(nx, ny) && board[nx][ny] == opp){
                nx += dx
                ny += dy 
                if (!onBoard(nx, ny)) {continue}
                while (board[x][y] == opp) {
                    nx += dx
                    ny += dy
                    if (!onBoard(nx, ny)) {break}
                }
            }
            if (!onBoard(nx, ny) || board[nx][ny] != color) {continue}
            while ((nx, ny) != (x, y)){
                nx -= dx
                ny -= dy
                console.log("change", nx, ny)
                changeColor(id, color)
            }
        }
    }
}

function changeColor(id, c) {
    // black = 0, white = 1
    var elem = document.getElementById(id)
    if (c === 0) {
        elem.className = 'circle black'
        board[id] = 0
        score_b += 1
    }
    else if (c === 1) {
        elem.className = 'circle white'
        board[id] = 1
        score_w += 1
    }
    console.log(board)
    console.log(`Score black: ${score_b}`, `Score white: ${score_w}`)
    
}

function flipColor(id) {
    let color = board[id]
    color = swap_color[color]
    
    if (color == 0) {
        color_w -= 1
    } else if (color == 1) {
        color_b -= 1
    }

    changeColor(id, color)
}

function getCord(id) {
    id = parseInt(id);
    return [id % 8, Math.floor(id / 8)]
}