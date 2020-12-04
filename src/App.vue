<template>
  <v-app>
    <v-app-bar elevation="0" app color="primary" dark>
      <div class="d-flex align-center">
        <h2>4Connect</h2>
      </div>

      <v-spacer></v-spacer>

      <div>
        Turn: Player {{  currentPlayer }}
      </div>
    </v-app-bar>

    <v-main class="main">
      <Board />
    </v-main>
  </v-app>
</template>

<script>
import Board from "./components/Board.vue";

export default {
  name: "App",

  components: {
    Board
  },

  data: () => ({}),

  computed: {
    currentPlayer() {
      return this.$store.state.currentPlayer;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0;
  margin: 0;
}
</style>