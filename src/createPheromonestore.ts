export function createPheromonestore() {
  const Pheromonesrecord = new Map<`${number},${number}`, number>();
  /* 获得信息素 */
  function getPheromone(left: number, right: number): number | undefined {
    //信息素参数不分正反
    return (
      Pheromonesrecord.get(`${left},${right}`) ??
      Pheromonesrecord.get(`${right},${left}`)
    );
  }
  /* 修改信息素 */
  function setPheromone(left: number, right: number, Pheromone: number): void {
    //参数排序
    //信息素参数不分正反
    let max = Math.max(left, right);
    let min = Math.min(left, right);
    Pheromonesrecord.set(`${min},${max}`, Pheromone);
  }
  console.log(Pheromonesrecord);

  return {
    getPheromone,
    setPheromone,
    [Symbol.toStringTag]: "PheromoneStore",
  };
}
