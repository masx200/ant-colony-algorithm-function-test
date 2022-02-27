import { drawlinechart, myChart } from "../functions/echarts-line";

export function testdrawlinechart() {
    console.log("test drawlinechart");
    drawlinechart(
        [
            [20, 120],
            [50, 200],
            [40, 50],
        ],
        myChart
    );
    
}
