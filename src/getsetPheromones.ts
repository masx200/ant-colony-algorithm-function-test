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
    //信息素参数不分正反
    let max = Math.max(left, right);
    let min = Math.min(left, right);
    Pheromonesrecord.set(`${min},${max}`, Pheromone);
}
console.log(Pheromonesrecord);