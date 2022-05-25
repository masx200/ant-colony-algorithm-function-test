import "core-js/stable/array/at";
import { assert_true } from "../test/assert_true";
import { ant_colony_algorithms } from "./ant_colony_algorithms";
import { ant_colony_algorithms_to_creator } from "./ant_colony_algorithms_to_creator";
import { appcontainer } from "./appcontainer";
import { app } from "./main";

assert_true(
    ant_colony_algorithms.every((algorithm) => {
        return Reflect.has(ant_colony_algorithms_to_creator, algorithm);
    })
);

app.config.errorHandler = (e: any) => {
    typeof alert === "function" &&
        alert?.(
            [
                String(e),
                e.message,
                String(e.error?.stack),
                String(e?.stack),
            ].join("\n")
        );
    setTimeout(() => {
        throw e;
    });
};
app.mount(appcontainer);
!(async () => {
    if (process.env.NODE_ENV === "production") {
        const { registerSW } = await import("virtual:pwa-register");

        if (
            location.hostname !== "localhost" &&
            "127.0.0.1" !== location.hostname
        ) {
            "serviceWorker" in navigator &&
                (function () {
                    const updateSW = registerSW({
                        onNeedRefresh() {},
                        onOfflineReady() {},
                    });
                    updateSW(true).catch(() => {});
                })();
        }
    }
})();
