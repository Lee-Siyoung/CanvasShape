import { Shape } from "@/class/shape";
import { IHistory } from "../history";

export const redoCreate = (shape: Shape[], history: IHistory) => {
  if (history.Create) shape.push(history.Create.shape);
};
