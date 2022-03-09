export function copyArrayAndShuffle(nodesinsidecircle: number[]): number[] {
    return Array.from(nodesinsidecircle).sort(() => Math.random() - 0.5);
}
