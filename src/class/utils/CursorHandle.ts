export const setCursorHandle = (canvas: HTMLCanvasElement, index: number) => {
  switch (index) {
    case 0:
      canvas.style.cursor = "nw-resize";
      break;
    case 1:
      canvas.style.cursor = "n-resize";
      break;
    case 2:
      canvas.style.cursor = "ne-resize";
      break;
    case 3:
      canvas.style.cursor = "w-resize";
      break;
    case 4:
      canvas.style.cursor = "e-resize";
      break;
    case 5:
      canvas.style.cursor = "sw-resize";
      break;
    case 6:
      canvas.style.cursor = "s-resize";
      break;
    case 7:
      canvas.style.cursor = "se-resize";
      break;
    default:
      canvas.style.cursor = "default";
  }
};
