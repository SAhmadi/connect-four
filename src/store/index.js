import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    currentPlayer: 1,
  },
  mutations: {
    mutateBoard(state, payload) {
      let { col } = payload;

      // create new board
      let board = [];
      for (let i = 0; i < state.board.length; i++) {
        board.push([]);

        for (let j = 0; j < state.board[0].length; j++) {
          board[i][j] = state.board[i][j];
        }
      }

      // iterate over column of the changed cell and find bottom most free cell
      for (let i = state.board.length - 1; i >= 0; i--) {
        if (board[i][col] === 0) {
          board[i][col] = state.currentPlayer === 1 ? 1 : 2;
          break;
        }
      }

      state.board = board;
      console.log(`${state.board} mutated`);
    },

    mutateCurrentPlayer(state) {
      if (state.currentPlayer === 1) {
        state.currentPlayer = 2;
      } else {
        state.currentPlayer = 1;
      }
    },
  },
  actions: {
    updateBoard: function({ commit }, payload) {
      commit("mutateBoard", payload);
    },
    updateCurrentPlayer: function({ commit }) {
      commit("mutateCurrentPlayer");
    },
  },
  modules: {},
});
