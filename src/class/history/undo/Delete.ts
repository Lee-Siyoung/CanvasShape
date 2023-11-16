import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const undoDelete = (shape: Shape[], history: IHistory) => {
  if (history.Delete) shape.push(history.Delete.shape);
};
