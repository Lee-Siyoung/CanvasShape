import { Shape } from "@/class/shape";
import { IHistory } from "../history";

export const redoDelete = (shape: Shape[], history: IHistory) => {
  const deleteHistory = history.Delete;
  if (deleteHistory) {
    const index = shape.findIndex(
      (shape) => shape.id === deleteHistory.shape.id
    );
    if (index !== -1) {
      shape.splice(index, 1);
    }
  }
};
