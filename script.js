let snakes = [[7,9],[7,8],[7,7],[7,6],[7,5]]
let allGrid = []
for (let i = 0; i<15; i++){
  for (let u = 0; u<15; u++){
    allGrid.push([i, u])
  }
}

const snakeClasses = ['snakeClass0', 'snakeClass1', 'snakeClass2', 'snakeClass3', 'snakeClass4', 'snakeClass5']

let apple = [13,13]

let appleCount = 0

var audioElementS = new Audio('mario_star.mp3')
audioElementS.loop = true

var intervalId

function myStopFunction() {
  audioElementS.pause()
  keydirection = 'right'
  document.querySelector('.startButton').style.display = "block"
      document.querySelector('.appleCount').innerHTML = `Apples eaten: 0`
  clearInterval(intervalId)
}

function myStartFunction() {
  document.querySelector('.startButton').style.display = "none"
  intervalId = window.setInterval(function(){
    drawSnake(snakes, keydirection, apple, allGrid)
  }, 250)
}

function appleCheck(apple, snake, allGrid) {
  if (JSON.stringify(snake[0]) === JSON.stringify(apple)){
    const tr = document.querySelector(`.r${apple[0]}`)
    tr.cells[apple[1]].classList.remove('appleClass', 'starClass')
    let applePos = allGrid.filter(c => snake.every(l => JSON.stringify(c) !== JSON.stringify(l)))
    console.log(applePos)
    let randomA=Math.floor(Math.random() * applePos.length)
    apple[0] = applePos[randomA][0]
    apple[1] = applePos[randomA][1]
    const tr2 = document.querySelector(`.r${apple[0]}`)
    appleCount++
    document.querySelector('.appleCount').innerHTML = `Apples eaten: ${appleCount}`
    if (((appleCount % 5) == 0) && appleCount!=0){
      tr2.cells[apple[1]].classList.add('starClass')
      audioElementS.play()
    }
    else{
      tr2.cells[apple[1]].classList.add('appleClass')
      audioElementS.pause()
    }
  }

  else{
    snake.splice(-1)
    const tr = document.querySelector(`.r${apple[0]}`)
    if (((appleCount % 5) == 0) && appleCount!=0){
      tr.cells[apple[1]].classList.add('starClass')
      audioElementS.play()
    }
    else{
      tr.cells[apple[1]].classList.add('appleClass')
      audioElementS.pause()
    }
  }
}

// let applePos = allGrid
// for (let i = 0; i<snakes.length; i++){
//     for (let u = 0; u<allGrid.length; u++){
//       if (snakes[i] == applePos[u]){
//         applePos.splice(u, 1)
//       }
//   }
// }

// console.log(allGrid)

document.onkeydown = checkKey;
let keydirection = 'right'
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      if (keydirection != 'down'){
        keydirection = 'up'
      }
        // up arrow
    }
    else if (e.keyCode == '40') {
      if (keydirection != 'up'){
        keydirection = 'down'
      }
        // down arrow
    }
    else if (e.keyCode == '37') {
      if (keydirection != 'right'){
        keydirection = 'left'
      }
       // left arrow
    }
    else if (e.keyCode == '39') {
      if (keydirection != 'left'){
        keydirection = 'right'
      }
       // right arrow
    }
}

function upPress() {
        if (keydirection != 'down'){
        keydirection = 'up'
      }
}

function downPress() {
  if (keydirection != 'up'){
        keydirection = 'down'
      }
}

function rightPress() {
  if (keydirection != 'left'){
        keydirection = 'right'
      }
}

function leftPress() {
        if (keydirection != 'right'){
        keydirection = 'left'
      }
}

function phoneActive() {
      document.querySelector('.phoneButtons').style.display = "block"
}

function drawSnake(snake, keydirection, apple, allGrid) {
  if (keydirection == 'right'){
    const y = snake[0][0]
    const x = snake[0][1]
    snake.unshift([y, x+1])
    if (x == 14) {
      snake[0][1] = 0
    }
  }

  else if (keydirection == 'left'){
    const y = snake[0][0]
    const x = snake[0][1]
    snake.unshift([y, x-1])
    if (x == 0) {
      snake[0][1] = 14
    }
  }

  else if (keydirection == 'up'){
    const y = snake[0][0]
    const x = snake[0][1]
    snake.unshift([y-1, x])
    if (y == 0) {
      snake[0][0] = 14
    }
  }

  else if (keydirection == 'down'){
    const y = snake[0][0]
    const x = snake[0][1]
    snake.unshift([y+1, x])
    if (y == 14) {
      snake[0][0] = 0
    }
  }

  for (let i = 0; i<15; i++) {
    const tr = document.querySelector(`.r${i}`)
    for (let u = 0; u<15; u++) {
      tr.cells[u].classList.remove(snakeClasses[0], snakeClasses[1], snakeClasses[2], snakeClasses[3], snakeClasses[4], snakeClasses[5], 'snakeClassHead')
    }
  }

  appleCheck(apple, snake, allGrid)
  
  for (let i = 1; i<snake.length; i++) {
    // console.log(block[1])
    const tr = document.querySelector(`.r${snake[i][0]}`)
    // console.log(tr.cells)
    if ((appleCount % 5) == 0 && appleCount!=0){
      tr.cells[snake[i][1]].classList.add(snakeClasses[(i-1)%6])
    }
    else{
      tr.cells[snake[i][1]].classList.add(snakeClasses[3])
    }
  }
  const head = document.querySelector(`.r${snake[0][0]}`)
  head.cells[snake[0][1]].classList.add('snakeClassHead')
  
  for (let i = 1; i<snake.length; i++) {
    if (JSON.stringify(snake[0]) === JSON.stringify(snake[i])){
      myStopFunction()
      for (let h = 0; h<15; h++) {
        const tr = document.querySelector(`.r${h}`)
        for (let u = 0; u<15; u++) {
          tr.cells[u].classList.remove(snakeClasses[0], snakeClasses[1], snakeClasses[2], snakeClasses[3], snakeClasses[4], snakeClasses[5], 'snakeClassHead', 'appleClass', 'starClass')
        }
      }
      appleCount = 0
      snake.length = 0
      snake.push([7,9],[7,8],[7,7],[7,6],[7,5])
      apple.length = 0
      apple.push(13,13)
    }
  }
}
