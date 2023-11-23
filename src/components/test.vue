<template>
  <div class="color-picker">
    <div
      class="color-gradient"
      @mousedown="handleMouseDown"
      ref="colorGradient"
      style="
        width: 300px;
        height: 150px;
        background: linear-gradient(to right, #f00 0%, #f0f 100%),
          linear-gradient(to top, #fff, transparent, #000);
      "
    ></div>
    <input
      v-model="color.hex"
      @input="updateFromHex"
      placeholder="Hex Color Code"
    />
    <input
      type="range"
      v-model="color.brightness"
      min="0"
      max="100"
      @input="updateBrightness"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

interface Color {
  r: number;
  g: number;
  b: number;
  brightness: number;
  hex: string;
}

export default defineComponent({
  name: "ColorPicker",
  setup() {
    const color: Ref<Color> = ref({
      r: 255,
      g: 0,
      b: 0,
      brightness: 100,
      hex: "#ff0000",
    });

    const colorGradient = ref<HTMLElement | null>(null);

    const handleMouseDown = (event: MouseEvent) => {
      if (colorGradient.value) {
        const rect = colorGradient.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        color.value.r = Math.round((x / rect.width) * 255);
        color.value.g = Math.round((y / rect.height) * 255);
        color.value.hex = rgbToHex(color.value.r, color.value.g, color.value.b);
      }
    };

    const updateFromHex = () => {
      // Convert HEX to RGB and update color
    };

    const updateBrightness = () => {
      // Adjust brightness
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      const toHex = (c: number) => ("0" + c.toString(16)).slice(-2);
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    return {
      color,
      colorGradient,
      handleMouseDown,
      updateFromHex,
      updateBrightness,
    };
  },
});
</script>

<style>
.color-gradient {
  cursor: crosshair;
  user-select: none;
}
</style>
