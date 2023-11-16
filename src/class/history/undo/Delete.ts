import { Shape } from "@/class/shape/shape";
import { IHistory } from "../history";

export const undoDelete = (shape: Shape[], history: IHistory) => {
  if (history.Delete) shape.push(history.Delete.shape);
};
