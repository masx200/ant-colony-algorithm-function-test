
import { appcontainer } from "./appcontainer";
import { app } from "./main";
app.config.errorHandler = (e) => {
    throw e;
};
app.mount(appcontainer);
!(async () => {
    if (process.env.NODE_ENV === "production") {
        //@ts-ignore
        const { registerSW } = await import("virtual:pwa-register");

        registerSW({});
    }
})();
