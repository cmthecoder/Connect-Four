/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
const cellEls = document.querySelectorAll('.cell')

const messageEl = document.getElementById('message')

const gameBoard = document.querySelector('.board')

const resetBtn = document.getElementById('button')

/*----------------------------- Event Listeners -----------------------------*/
gameBoard.addEventListener('click', handleClick)

resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  
  turn = 1
  winner = null
  render()
}



function render(){
  board.forEach((cell, idx) => {
    if(cell === 1){
      cellEls[idx].classList.add('player-one')
    }

    if(cell === -1){
      cellEls[idx].classList.add('player-two')
      
    }


    if(cell === null){
      cellEls[idx].className = 'cellEls'
    }

    if(winner === null){
      messageEl.textContent = `Player ${turn === 1 ? '1' : '2'}'s turn`
    } else if (winner === 'T'){
      messageEl.textContent = `It's a tie`
    } else {
      messageEl.textContent = `Player ${winner} wins`
    }
  });
}

function handleClick(evt){
  let cIdx = parseInt(evt.target.id.replace('c', ''))

  if(board[cIdx] !== null ){
    return
  }

  if(winner !== null){
    return
  }


  const rIdx = stack(cIdx)
  board[rIdx] = turn
  turn *= -1
  isWinner()
  render()
}



function stack (cIdx){
    let spot = cIdx + 35

    if(board[cIdx + 35] !== null){
      spot = cIdx + 28
    } 
    if(board[cIdx + 28] !== null){
      spot = cIdx + 21
    }
    if(board[cIdx + 21] !== null){
      spot = cIdx + 14
    }
    if(board[cIdx + 14] !== null){
      spot = cIdx +7
    }
    if(board[cIdx + 7] !== null){
      spot = cIdx
    }
    
    return spot
}




function isWinner(){
  let total = []
  winningCombos.forEach(function(combo){

    const sum = board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]]
    total.push(sum)
  })

  let p1Win = total.some(p1Win => p1Win === 4)

  let p2Win = total.some(p2Win => p2Win === -4)

  let isTie = board.some(cells => cells === null)

  if(p1Win){
    winner = "1"
    const cheer = new Audio("../assets/audio/cheer.wav")
    cheer.play()
    
  } else if(p2Win){
    winner = '2'
    const cheer = new Audio("../assets/audio/cheer.wav")
    cheer.play()

  } else {
    if(isTie === false){
      winner ='T'
      const tie = new Audio("../assets/audio/mixkit-cartoon-failure-piano-473.wav")
      tie.play()
    }
  }
}