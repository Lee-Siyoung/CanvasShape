<template>
  <div>
    <button @click="clickUndo">Undo</button>
    <button @click="clickRedo">Redo</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["clickUndo", "clickRedo"],
  setup(_, { emit }) {
    const clickUndo = () => {
      emit("clickUndo");
    };
    const clickRedo = () => {
      emit("clickRedo");
    };
    return { clickUndo, clickRedo };
  },
});
</script>

<style scoped></style>
