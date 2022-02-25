const Pheromonesrecord = new Map<`${number},${number}`, number>();
/* 获得信息素 */
export function getPheromones(left: number, right: number) {
    //信息素参数不分正反
    return (
        Pheromonesrecord.get(`${left},${right}`) ??
        Pheromonesrecord.get(`${right},${left}`)
    );
}
/* 修改信息素 */
export function setPheromones(left: number, right: number, Pheromone: number) {
    //参数排序
    let sorted = [left, right].sort((a, b) => a - b);
    Pheromonesrecord.set(`${sorted[0]},${sorted[1]}`, Pheromone);
}
console.log(Pheromonesrecord);