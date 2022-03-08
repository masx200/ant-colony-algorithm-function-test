import { DataOfFinishAllIteration } from "../functions/DataOfFinishAllIteration";
import { dataofresult } from "./resultTableHeads-resultTableBody";

export function onreceivedataofAllIteration(data: DataOfFinishAllIteration) {
    dataofresult.value = data;
}
