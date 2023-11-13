<template>
  <div>
    <button @click="drawRectangle">사각형</button>
    <button @click="drawTriangle">삼각형</button>
    <button @click="drawCircle">원</button>
    <!-- <button @click="drawText">텍스트</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["checkShape"],
  setup(_, { emit }) {
    const drawRectangle = () => {
      emit("checkShape", "rectangle");
    };
    const drawTriangle = () => {
      emit("checkShape", "triangle");
    };
    const drawCircle = () => {
      emit("checkShape", "circle");
    };
    /* const drawText = () => {
      emit("checkShape", "text");
    }; */
    return { drawRectangle, drawTriangle, drawCircle /* drawText */ };
  },
});
</script>

<style scoped></style>
