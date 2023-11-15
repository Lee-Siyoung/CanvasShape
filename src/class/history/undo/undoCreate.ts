import { Shape } from "../../shape";

export const undoCreate = (shape: Shape[]) => {
  shape.pop();
};
