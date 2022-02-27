import { createmychart, drawlinechart } from "../functions/echarts-line";

export function testdrawlinechart() {
    console.log("test drawlinechart");
    const mychart = createmychart();
    const data: [number, number][] = [
        [20, 120],
        [50, 200],
        [40, 50],
        [20, 120],
        [50, 200],
        [40, 50],
        [20, 120],
        [50, 200],
        [40, 50],
    ].map(([a, b]) => {
        return [a * Math.random(), b * Math.random()];
    });
    console.log('画出折线图的数据是',data)
    drawlinechart(data, mychart);
}
