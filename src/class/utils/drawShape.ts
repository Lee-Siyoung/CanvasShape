import { State } from "./State";

export const drawShape = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State
) => {
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const shape of state.shapes) {
      ctx.strokeStyle = shape.isClick ? state.clickColor : state.notClickColor;
      shape.draw(ctx);
    }
  }
};
