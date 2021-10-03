var board = []
// Black 0
// White 1
// Green -1
var player_color = Math.floor(Math.random() * 2)
var swap_color = { 1: 0, 0: 1 }

function init() {
  // Add circles to board
  for (let i = 0; i < 64; ++i) {
    var x = document.createElement("div")
    var y = document.createElement("div")
    y.className = "circle green"
    x.className = "green"
    x.appendChild(y)
    y.id = i
    y.addEventListener("click", selectTile)
    document.getElementById("container").append(x)
  }

  // Init board
  for (let i = 0; i < 8; ++i) {
    var u = []
    for (let j = 0; j < 8; ++j) {
      u.push(-1)
    }
    board.push(u)
  }
  changeColor(28, 0)
  changeColor(35, 0)
  changeColor(27, 1)
  changeColor(36, 1)
  
  showValids()
  updateScore()
}

function selectTile(elem) {
  // User calls this when click on circle
  id = elem.path[0].id
  
  // Check valid move
  var valids = getValidMoves(player_color)
  console.log(valids, parseInt(id))
  if (!valids.includes(parseInt(id))) {return}
  changeColor(id, player_color)
 

  // Flippy flippy
  var x = flips(id, player_color)
  console.log("X", x)
  for (let i = 0; i < x.length; ++i) {
    changeColor(x[i], player_color)
    console.log(x[i])
  }
  removeValids()
  showValids()
  updateScore()

  // Computer make move here
}

function getColor(id) {
  var x = getCord(id)
  return board[x[0]][x[1]]
}

function flips(id, color) {
  var x = getCord(id)[0], y = getCord(id)[1]
  var opp = swap_color[color]
  var flips = []
  for (let dx = -1; dx < 2; ++dx) {
    for (let dy = -1; dy < 2; ++dy) {
      var opps = []
      for (let i = 1; i < 9; ++i) {
        var nx = x + i * dx
        var ny = y + i * dy
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) {
          break
        }
        if (board[nx][ny] == -1 || board[nx][ny] == 2) {
          break
        } else if (board[nx][ny] == opp) {
          opps.push(getId(nx, ny))
        } else if (board[nx][ny] == color) {
          flips.push.apply(flips, opps)
          break
        }
      }
    }
  }
  return flips
}

function changeColor(id, c) {
  // black = 0, white = 1, gray = 2
  var elem = document.getElementById(id)
  var x = getCord(id)[0],
    y = getCord(id)[1]
  if (c === 0) {
    elem.className = "circle black"
    board[x][y] = 0
  } else if (c === 1) {
    elem.className = "circle white"
    board[x][y] = 1
  } else if (c === 2) {
    elem.className = "circle gray"
    board[x][y] = 2
  } else if (c === -1) {
    elem.className = "circle green"
    board[x][y] = -1
  }
}

function getCord(id) {
  id = parseInt(id)
  return [id % 8, Math.floor(id / 8)]
}

function getId(x, y) {
  return x + y * 8
}

function getValidMoves(color) {
  var valids = []
  for (var i = 0; i < 64; i++) {
    if (getColor(i) == -1 || getColor(i) == 2) {
      var temp = flips(i, color)
      if (temp.length > 0) {
        valids.push(i)
      }
    }
  }

  return valids
}

function showValids() {
  var valids = getValidMoves(player_color)
  for (var i = 0; i < valids.length; i++) {
    changeColor(valids[i], 2)
  }
}

function removeValids() {
  for (let i = 0; i < 64; ++i) {
    console.log(getColor(i))
    if (getColor(i) == 2) {changeColor(i, -1)}
  }
}

function updateScore() {
  var score_w = 0
  var score_b = 0
  var elem = document.getElementById("score")
  for (var i = 0; i < 64; i++) {
    var color = getColor(i)
    if (color == 0) {
      score_b += 1
    } else if (color == 1) {
      score_w += 1
    }
  }
  elem.innerHTML = `Score white: ${score_w} Score black: ${score_b}`
}
