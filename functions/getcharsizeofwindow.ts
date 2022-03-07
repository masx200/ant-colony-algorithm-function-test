/* 获得图表的大小通过窗口的大小 */
export function getcharsizeofwindow(): { width: number; height: number } {
    const min = Math.max(
        300,
        Math.min(
            window.innerHeight,
            window.innerWidth,
            document.body.clientHeight,
            document.body.clientWidth
        )
    );
    return {
        width: min,
        height: min,
    };
}
