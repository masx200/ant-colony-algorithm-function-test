import { createApp, h } from "vue";
import { divide_route_to_k_opt_random } from "../functions/divide_route_to_k-opt-random";
import "../functions/echarts-line";
import { split_cycle_route_to_3_sections } from "../functions/split_cycle_route_to_3_sections";
import appcom from "./appcom.vue";
import { appcontainer } from "./appcontainer";
import "./style.css";
// import { TSP_cities_map } from "./TSP_cities_map";

document.title = "ant-colony-algorithm-function-test";

const app = createApp({
    render() {
        return h(appcom);
    },
});
app.mount(appcontainer);
// console.log(app);
// console.log(TSP_cities_map);
// console.log(divide_route_to_k_opt_random);
// console.log(split_cycle_route_to_3_sections);
