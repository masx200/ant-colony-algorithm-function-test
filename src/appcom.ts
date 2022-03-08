import { defineComponent, onMounted, reactive, ref } from "vue";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { createchartofcontainer } from "./createchartofcontainer";
import {
    oneiterationtablebody,
    oneiterationtableheads,
} from "./dataofoneiteration";
import { oneroutetablebody, oneroutetableheads } from "./dataofoneroute";
// const containertoechart = new WeakMap<
//     HTMLElement,
//     ReturnType<typeof createchartofcontainer>
// >();
import datatable from "./datatable.vue";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import {
    resultTableBody,
    resultTableHeads,
} from "./resultTableHeads-resultTableBody";
import { showanddrawrandomgreedyoftsp } from "./showanddrawrandomgreedyoftsp";
import { TSP_Start } from "./tsp-start";
import { TSP_cities_map } from "./TSP_cities_map";
import { TSP_terminate } from "./TSP_terminate";
const TSP_cities_data = Array.from(TSP_cities_map.entries());
console.log(TSP_cities_data);
export default defineComponent({
    components: { datatable },
    setup() {
        const disablemapswitching = ref(false);
        const searchrounds = ref(5);
        const numberofeachround = ref(5);
        const selecteleref = ref<HTMLSelectElement>();
        const chartofbestref = ref<HTMLDivElement>();
        const chartoflatestref = ref<HTMLDivElement>();
        const chartstore: {
            best: undefined | ReturnType<typeof createchartofcontainer>;
            latest: undefined | ReturnType<typeof createchartofcontainer>;
        } = reactive({
            best: undefined,
            latest: undefined,
        });
        const submit = () => {
            const element = selecteleref.value;
            console.log(element);
            console.log(element?.value);
            const nodecoordinates = TSP_cities_map.get(element?.value || "");
            if (nodecoordinates) {
                console.log(nodecoordinates);
                setTimeout(() => {
                    const latestchart = chartstore.latest;
                    if (latestchart) {
                        showanddrawrandomgreedyoftsp(
                            nodecoordinates,
                            latestchart
                        );
                    }
                });
                setTimeout(() => {
                    const bestchart = chartstore.best;
                    if (bestchart) {
                        showanddrawrandomgreedyoftsp(
                            nodecoordinates,
                            bestchart
                        );
                    }
                });
            }
        };
        onMounted(() => {
            console.log(selecteleref);
            const element = selecteleref.value;
            element && (element.selectedIndex = 0);

            // console.log(containertoechart);
            console.log(chartofbestref);
            console.log(chartoflatestref);

            const containerofbest = chartofbestref.value;
            const containeroflatest = chartoflatestref.value;
            // setTimeout(() => {
            if (containerofbest && containeroflatest) {
                const bestchart = createchartofcontainer(containerofbest);
                const latestchart = createchartofcontainer(containeroflatest);
                console.log({ bestchart, latestchart });
                chartstore.latest = latestchart;
                chartstore.best = bestchart;
            }
            // setTimeout(() => {
            submit();
            // });
            // });
        });
        const onLatestRouteChange = (
            route: number[],
            nodecoordinates: Nodecoordinates
        ) => {
            const latestchart = chartstore.latest;
            if (latestchart) {
                drawrouteofnodecoordinates({
                    route,
                    nodecoordinates,
                    chart: latestchart,
                });
            }
        };
        const onGlobalBestRouteChange = (
            route: number[],
            nodecoordinates: Nodecoordinates
        ) => {
            const chart = chartstore.best;
            if (chart) {
                drawrouteofnodecoordinates({
                    route,
                    nodecoordinates,
                    chart: chart,
                });
            }
        };

        const runtsp = () => {
            console.log("搜索轮次", searchrounds.value);
            console.log("每轮次数", numberofeachround.value);
            const roundofsearch = searchrounds.value;
            const numberofeachroundvalue = numberofeachround.value;
            const element = selecteleref.value;
            element && (element.selectedIndex = 0);
            const nodecoordinates = TSP_cities_map.get(element?.value || "");
            if (
                roundofsearch > 0 &&
                numberofeachroundvalue > 0 &&
                nodecoordinates
            ) {
                disablemapswitching.value = true;
                const numberofants = numberofeachroundvalue;
                console.log(nodecoordinates);
                TSP_Start({
                    onGlobalBestRouteChange,
                    nodecoordinates,
                    numberofants,
                    roundofsearch,
                    onLatestRouteChange,
                });
            } else {
                searchrounds.value = 1;
                numberofeachround.value = 1;
            }
        };
        function reset() {
            // const element = selecteleref.value;
            // element && (element.selectedIndex = 0);
            // const nodecoordinates = TSP_cities_map.get(element?.value || "");
            TSP_terminate();
            disablemapswitching.value = false;
        }
        return {
            reset,
            resultTableHeads,
            resultTableBody,
            oneroutetableheads,
            oneroutetablebody,
            oneiterationtableheads,
            oneiterationtablebody,
            numberofeachround,
            disablemapswitching,
            runtsp,
            searchrounds,
            TSP_cities_data,
            submit,
            selecteleref,
            chartofbestref,
            chartoflatestref,
        };
    },
});
