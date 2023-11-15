import { Shape } from "../../shape";
import { IHistory } from "../history";

export const undoDelete = (shape: Shape[], historyId: IHistory) => {
  if (historyId.Delete) shape.push(historyId.Delete.shape);
};
