import { asserttrue } from "../test/asserttrue";

export const appcontainer = (() => {
    const app = document.querySelector<HTMLDivElement>("#app");
    asserttrue(app);
    return app;
})();
