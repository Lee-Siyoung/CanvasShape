<template>
  <div>
    <button @click="drawRectangle">사각형</button>
    <button @click="drawTriangle">삼각형</button>
    <button @click="drawCircle">원</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["addShape", "CheckShape"],
  setup(_, { emit }) {
    const drawRectangle = () => {
      emit("CheckShape", "rectangle");
    };
    const drawTriangle = () => {
      emit("CheckShape", "triangle");
    };
    const drawCircle = () => {
      emit("CheckShape", "circle");
    };
    return { drawRectangle, drawTriangle, drawCircle };
  },
});
</script>

<style scoped></style>
