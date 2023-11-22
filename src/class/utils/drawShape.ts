import { State } from "./State";

export const drawShape = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State
) => {
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const shape of state.shapes) {
      ctx.globalAlpha = 0.9;
      shape.draw(ctx);
    }
  }
};
