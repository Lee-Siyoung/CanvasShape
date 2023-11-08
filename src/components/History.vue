<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button>Undo</button>
    <button>Redo</button>
  </div>
</template>

<script lang="ts">
import { Shape } from "@/class/shape";
import { defineComponent, reactive, PropType, toRefs } from "vue";

export default defineComponent({
  props: {
    shapes: {
      type: Array as PropType<Shape[]>,
      required: true,
    },
  },
  setup(props) {
    const { shapes } = toRefs(props);
    const state = reactive({
      history: [],
    });
    return { state };
  },
});
</script>

<style scoped></style>
