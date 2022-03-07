import { createApp, h } from "vue";
import "../functions/echarts-line";
import { appcontainer } from "./appcontainer";

import appcom from "./appcom.vue";

import "./style.css";

document.title = "ant-colony-algorithm-function-test";

const app = createApp({
    render() {
        return h(appcom);
    },
});
app.mount(appcontainer);
