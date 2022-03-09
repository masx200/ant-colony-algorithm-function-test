import { EChartsType } from "echarts";
import { defineComponent, onMounted, ref, shallowReactive } from "vue";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { assertnumber } from "../test/assertnumber";
import { createchartofcontainer } from "./createchartofcontainer";
import {
    oneiterationtablebody,
    oneiterationtableheads,
} from "./dataofoneiteration";
import { oneroutetablebody, oneroutetableheads } from "./dataofoneroute";
// const containertoechart = new WeakMap<
//     HTMLElement,
//     EChartsType
// >();
import datatable from "./datatable.vue";
import {
    defaultsearchrounds,
    defaultnumberofants,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
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
        const is_running = ref(false);
        const local_pheromone_volatilization_rate = ref(
            default_local_pheromone_volatilization_rate
        );
        const disablemapswitching = ref(false);
        const searchrounds = ref(defaultsearchrounds);
        const numberofeachround = ref(defaultnumberofants);
        const selecteleref = ref<HTMLSelectElement>();
        const container_of_best_chart = ref<HTMLDivElement>();
        const container_of_latest_chart = ref<HTMLDivElement>();
        const container_of_iteration_rounds_and_information_entropy_chart =
            ref<HTMLDivElement>();

        const container_of_path_number_and_current_path_length_chart =
            ref<HTMLDivElement>();
        const container_of_path_number_and_optimal_path_length_chart =
            ref<HTMLDivElement>();

        const chartstore: {
            best: undefined | EChartsType;
            //   resize: () => void;

            latest: undefined | EChartsType;
            //   resize: () => void;
        } = shallowReactive({
            // } = shallowReactive({
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
                        showanddrawrandomgreedyoftsp({
                            // resize: latestchart.resize,
                            nodecoordinates,
                            chart: latestchart,
                        });
                    }
                });
                setTimeout(() => {
                    const bestchart = chartstore.best;
                    if (bestchart) {
                        showanddrawrandomgreedyoftsp({
                            // resize: bestchart.resize,
                            nodecoordinates,
                            chart: bestchart,
                        });
                    }
                });
            }
        };
        onMounted(() => {
            reset();
            console.log(selecteleref);
            const element = selecteleref.value;
            element && (element.selectedIndex = 0);

            // console.log(containertoechart);
            console.log(container_of_best_chart);
            console.log(container_of_latest_chart);

            const containerofbest = container_of_best_chart.value;
            const containeroflatest = container_of_latest_chart.value;
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
                    // resize: latestchart.resize,
                    route,
                    nodecoordinates,
                    chart: latestchart,
                });
            }
        };
        const onFinishIteration = () => {
            is_running.value = false;
        };
        const onGlobalBestRouteChange = (
            route: number[],
            nodecoordinates: Nodecoordinates
        ) => {
            const chart = chartstore.best;
            if (chart) {
                drawrouteofnodecoordinates({
                    // resize: chart.resize,
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
            // element && (element.selectedIndex = 0);
            const nodecoordinates = TSP_cities_map.get(element?.value || "");
            const pheromonevolatilitycoefficientR1 =
                local_pheromone_volatilization_rate.value;
            if (
                pheromonevolatilitycoefficientR1 > 0 &&
                roundofsearch > 0 &&
                numberofeachroundvalue >= 2 &&
                nodecoordinates
            ) {
                disablemapswitching.value = true;
                const numberofants = numberofeachroundvalue;
                console.log(nodecoordinates);
                assertnumber(numberofants);
                assertnumber(roundofsearch);
                assertnumber(pheromonevolatilitycoefficientR1);
                is_running.value = true;
                TSP_Start({
                    onFinishIteration,
                    pheromonevolatilitycoefficientR1,
                    onGlobalBestRouteChange,
                    nodecoordinates,
                    numberofants,
                    roundofsearch,
                    onLatestRouteChange,
                });
            } else {
                local_pheromone_volatilization_rate.value =
                    default_local_pheromone_volatilization_rate;
                searchrounds.value = defaultsearchrounds;
                numberofeachround.value = defaultnumberofants;
                disablemapswitching.value = false;
                is_running.value = false;
            }
        };
        function reset() {
            // const element = selecteleref.value;
            // element && (element.selectedIndex = 0);
            // const nodecoordinates = TSP_cities_map.get(element?.value || "");
            TSP_terminate();
            disablemapswitching.value = false;
            is_running.value = false;
        }
        return {
            container_of_iteration_rounds_and_information_entropy_chart,
            is_running,
            local_pheromone_volatilization_rate,
            reset,
            resultTableHeads,
            resultTableBody,
            oneroutetableheads,
            oneroutetablebody,
            oneiterationtableheads,
            oneiterationtablebody,
            numberofeachround,
            container_of_path_number_and_current_path_length_chart,
            disablemapswitching,
            container_of_path_number_and_optimal_path_length_chart,
            runtsp,
            searchrounds,
            TSP_cities_data,
            submit,
            selecteleref,
            container_of_best_chart,
            container_of_latest_chart,
        };
    },
});
