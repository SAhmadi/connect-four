<template>
  <v-container class="board">
    <div
      class="board-row"
      v-bind:key="rowIndex"
      v-for="(row, rowIndex) in board"
    >
      <span
        class="board-col"
        v-bind:key="colIndex"
        v-for="(cellValue, colIndex) in row"
      >
        <v-btn
          @click="setChip(rowIndex, colIndex)"
          color="white"
          class="board-cell"
          :style="
            cellValue === 1
              ? 'background:#ff3030;'
              : cellValue === 2
              ? 'background:#0091ff;'
              : ''
          "
          icon
          rounded
        >
          <span v-if="cellValue === 1 || cellValue === 2">
            {{ cellValue }}
          </span>
        </v-btn>
      </span>
    </div>

    <v-dialog
      v-model="isGameWon"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          🏆 Player {{ gameWinData.winner }} has won the game!
        </v-card-title>
        <v-card-text>
          Do you want to restart the game!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="isGameWon = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="resetGame"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Board",

  data: () => ({
    isGameWon: false,
    gameWinData: {},
  }),

  computed: {
    board() {
      return this.$store.state.board;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
  },

  methods: {
    setChip(row, col) {
      this.$store.dispatch("updateBoard", { col });

      // check if current player has won
      this.checkGameWin(row, col);

      this.$store.dispatch("updateCurrentPlayer");
    },

    checkGameWin(row, col) {
      let board = this.$store.state.board;
      let player = this.$store.state.currentPlayer;

      // Check vertical
      this.checkVertical(col, board, player);

      // Check horizontal
      this.checkHorizontal(row, board, player);

      // Check diagonal bottom-left to top-right
      this.checkDiagonalBottomLeftTopRight(row, col, board, player);

      // Check diagonal top-left to bottom-right
      this.checkDiagonalTopLeftBottomRight(row, col, board, player);

      // console.log(board + row + col);
    },

    checkVertical(col, board, player) {
      let count = 0;

      for (let i = 0; i < board.length; i++) {
        if (count >= 4) break;
        if (board[i][col] !== player) {
          count = 0;
        } else {
          count++;
        }
      }

      if (count >= 4) {
        this.gameWon(player, "Vertical");
      }
    },
    checkHorizontal(row, board, player) {
      let count = 0;

      for (let i = 0; i < 7; i++) {
        if (count >= 4) break;
        if (board[row][i] !== player) {
          count = 0;
        } else {
          count++;
        }
      }

      if (count >= 4) {
        this.gameWon(player, "Horizontal");
      }
    },
    checkDiagonalBottomLeftTopRight(row, col, board, player) {
      let count = 0;
      let tempRow = row;
      let tempCol = col;
    
      // Move down to lowest diagonal point of current cell
      while (tempRow + 1 < board.length && tempCol - 1 >= 0) {
        tempRow++;
        tempCol--;
      }

      // Move up to highest diagonal point and count
      while (tempRow - 1 >= 0 && tempCol + 1 < 7) {
        if (count >= 4) break;
        if (board[tempRow][tempCol] !== player) {
          count = 0;
        } else {
          count++;
        }
        tempRow--;
        tempCol++;
      }

      if (count >= 4) {
        this.gameWon(player, "Diagonal");
      }
    },
    checkDiagonalTopLeftBottomRight(row, col, board, player) {
      let count = 1;
      let tempRow = row;
      let tempCol = col;
    
      // Move up to highest diagonal point of current cell
      while (tempRow - 1 >= 0 && tempCol - 1 >= 0) {
        tempRow--;
        tempCol--;
      }

      // Move down to lowest diagonal point and count
      while (tempRow + 1 < board.length && tempCol + 1 < board[0].length) {
        if (count >= 4) break;
        if (board[tempRow][tempCol] !== player) {
          count = 1;
        } else {
          count++;
        }
        tempRow++;
        tempCol++;
      }

      if (count >= 4) {
        this.gameWon(player, "Diagonal");
      }
    },

    gameWon(player, message = '') {
      this.isGameWon = true;
      this.gameWinData = {
        winner: player,
        message: message,
      };
    },

    resetGame() {

    }
  },
};
</script>

<style lang="scss" scoped>
.board {
  width: 600px;
  height: 100%;
  text-align: center;
  margin: 10px auto 0 auto;

  &-row {
    padding: 12px;
    margin: 0;
  }

  &-col {
    padding: 10px;
  }

  &-cell {
    font-weight: bold;
    width: 50px !important;
    height: 50px !important;
    background: #ddd;
  }
}
</style>
