import { Shape } from "@/class/shape";
import { IHistory } from "../history";

export const redoDelete = (shape: Shape[], historyId: IHistory) => {
  const deleteHistory = historyId.Delete;
  if (deleteHistory)
    shape = shape.filter((shape) => shape.id !== deleteHistory.shape.id);
};
