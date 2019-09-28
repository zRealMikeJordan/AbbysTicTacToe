import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  public board: any;
  public player1: any;
  public player2: any;
  public gameState: any;

  constructor() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    this.player1 = {
      value: 1,
      name: 'Abby',
      symbol: 'X'
    }
    this.player2 = {
      value: -1,
      name: 'Daddy',
      symbol: 'O'
    }
    this.gameState = {
      currentPlayer: this.player1,
      over: false,
      winner: null
    }
  }

  ngOnInit() {
    this.clearBoard()
    this.playmusic()
  }

  updateBoard(player, rowindex, spaceindex) {

    //make sure empty space on the board
    if (this.board[rowindex][spaceindex] != 0) {
      return;
    }

    console.log(player)
    console.log("row " + rowindex + " space " + spaceindex);

    //log move
    this.board[rowindex][spaceindex] = player.value;

    //check for a winner
    if (this.checkForWinningConditions(player)) {
      this.gameState.over = true;
      this.gameState.winner = player;
      this.celebrate()
    }

    //change players
    if (!this.gameState.over) {
      this.gameState.currentPlayer = (player.value == 1 ? this.player2 : this.player1);
    }
    
  }

  checkArray(name, array, player) {
    let didWin = false;
    console.log("checking " + name);
    array.forEach((list) => {
      console.log(list)

      if (list.reduce((a, b) => a + b, 0) == (player.value * list.length)) {
        didWin = true;
      }
    })
    return didWin;
  }

  checkForWinningConditions(player) {
    let rows = [this.board[0], this.board[1], this.board[2]];
    let cols = [[this.board[0][0], this.board[1][0], this.board[2][0]], [this.board[0][1], this.board[1][1], this.board[2][1]], [this.board[0][2], this.board[1][2], this.board[2][2]]];
    let diags = [[this.board[0][0], this.board[1][1], this.board[2][2]], [this.board[0][2], this.board[1][1], this.board[2][0]]];

    if (this.checkArray("rows", rows, player)) {
      return true;
    };

    if (this.checkArray("cols", cols, player)) {
      return true;
    };

    if (this.checkArray("diagnols", diags, player)) {
      return true;
    };

    return false;
  }

  clearBoard() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }

  startover() {
    this.clearBoard()
    this.gameState = {
      currentPlayer: this.player1,
      over: false,
      winner: null
    }
  }

  celebrate() {
    let audio = new Audio();
    audio.src = "../../assets/clapping.mp3";
    audio.load();
    audio.play();
  }

  playmusic() {
    let audio = new Audio();
    audio.src = "../../assets/music.mp3";
    audio.loop = true;
    audio.load();
    audio.play();
    audio.volume = .5;
  }



}
