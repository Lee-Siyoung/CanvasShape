import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const redoCreate = (shape: Shape[], history: IHistory) => {
  if (history.Create) shape.push(history.Create.shape);
};
