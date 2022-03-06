export const cacheechartscontainers = new Set<HTMLElement>();
export const clearallecharts = () => {
    cacheechartscontainers.forEach((c) => {
        cacheechartscontainers.delete(c);
        c.remove();
    });
};
