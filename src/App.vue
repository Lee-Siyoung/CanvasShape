<template>
  <CanvasShapes />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CanvasShapes from "./components/CanvasShapes.vue";

export default defineComponent({
  name: "App",
  components: {
    CanvasShapes,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  height: 100vh;
}
</style>
