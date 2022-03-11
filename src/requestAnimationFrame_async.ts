export async function requestAnimationFrame_async(): Promise<void> {
    return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
}
