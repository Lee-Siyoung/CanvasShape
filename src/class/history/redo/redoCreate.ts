import { Shape } from "../../shape";
import { IHistory } from "../history";

export const redoCreate = (shape: Shape[], historyId: IHistory) => {
  if (historyId.Create) shape.push(historyId.Create.shape);
};
