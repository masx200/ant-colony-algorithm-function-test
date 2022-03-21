export function debounce_animation_frame<
    T extends (this: any, ...args: any[]) => void
>(fn: T): T {
    // let free = false;
    // let oldargs: any[] | undefined;
    let timer: undefined | number;
    return function (...args): void {
        const context = this;

        /* if (free) {
            Reflect.apply(fn, this, args);
        // } else */
        //{
        // oldargs = args;
        timer && cancelAnimationFrame(timer);
        timer = requestAnimationFrame(() => {
            // free = true;

            /* oldargs &&  */
            Reflect.apply(fn, context, args);
        });
        // }
    } as T;
}
