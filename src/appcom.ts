import { defineComponent, onMounted, ref, watch } from "vue";
import { drawlinechart } from "../functions/drawlinechart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { assertnumber } from "../test/assertnumber";
import {
    dataofoneiteration,
    oneiterationtablebody,
    oneiterationtableheads,
} from "./dataofoneiteration";
import {
    dataofoneroute,
    oneroutetablebody,
    oneroutetableheads,
} from "./dataofoneroute";
// const containertoechart = new WeakMap<
//     HTMLElement,
//     EChartsType
// >();
import datatable from "./datatable.vue";
import {
    defaultnumberofants,
    defaultsearchrounds,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import { dataOfAllResults } from "./onreceiveDataOfGlobalBest";
import {
    resultTableBody,
    resultTableHeads,
} from "./resultTableHeads-resultTableBody";
import { showanddrawrandomgreedyoftsp } from "./showanddrawrandomgreedyoftsp";
import { TSP_cities_map } from "./TSP_cities_map";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { TSP_before_Start } from "./TSP_before_Start";
import { TSP_terminate } from "./TSP_terminate";
import { use_escharts_container_pair } from "./use_escharts_container_pair";
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
        const { container: container_of_best_chart, chart: chart_store_best } =
            use_escharts_container_pair();
        const {
            container: container_of_latest_chart,
            chart: chart_store_latest,
        } = use_escharts_container_pair();
        // const container_of_best_chart = ref<HTMLDivElement>();
        // const container_of_latest_chart = ref<HTMLDivElement>();
        const {
            container:
                container_of_iteration_rounds_and_information_entropy_chart,
            chart: iteration_rounds_and_information_entropy_chart,
        } = use_escharts_container_pair();
        const {
            container: container_of_path_number_and_current_path_length_chart,
            chart: path_number_and_current_path_length_chart,
        } = use_escharts_container_pair();
        const {
            container: container_of_path_number_and_optimal_path_length_chart,
            chart: path_number_and_optimal_path_length_chart,
        } = use_escharts_container_pair();

        // const chartstore: {
        //     best: undefined | EChartsType;
        //     //   resize: () => void;

        //     latest: undefined | EChartsType;
        //     //   resize: () => void;
        // } = shallowReactive({
        //     // } = shallowReactive({
        //     best: undefined,
        //     latest: undefined,
        // });
        const submit = () => {
            const element = selecteleref.value;
            console.log(element);
            console.log(element?.value);
            const nodecoordinates = TSP_cities_map.get(element?.value || "");
            if (nodecoordinates) {
                console.log(nodecoordinates);
                setTimeout(() => {
                    const latestchart = chart_store_latest.value;
                    if (latestchart) {
                        showanddrawrandomgreedyoftsp({
                            // resize: latestchart.resize,
                            nodecoordinates,
                            chart: latestchart,
                        });
                    }
                });
                setTimeout(() => {
                    const bestchart = chart_store_best.value;
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

            // const containerofbest = container_of_best_chart.value;
            // const containeroflatest = container_of_latest_chart.value;
            // // setTimeout(() => {
            // if (containerofbest && containeroflatest) {
            //     const bestchart = createchartofcontainer(containerofbest);
            //     const latestchart = createchartofcontainer(containeroflatest);
            //     console.log({ bestchart, latestchart });
            //     chart_store_latest.value = latestchart;
            //     chart_store_best.value = bestchart;
            // }
            // setTimeout(() => {
            submit();
            data_change_listener();
            finish_one_iteration_listener();
            finish_one_route_listener();
            // });
            // });
        });
        const onLatestRouteChange = (
            route: number[],
            nodecoordinates: Nodecoordinates
        ) => {
            const latestchart = chart_store_latest.value;
            if (latestchart) {
                drawrouteofnodecoordinates({
                    // resize: latestchart.resize,
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
            const chart = chart_store_best.value;
            if (chart) {
                drawrouteofnodecoordinates({
                    // resize: chart.resize,
                    route,
                    nodecoordinates,
                    chart: chart,
                });
            }
        };
        onMounted(() => {
            watch(dataOfAllResults, () => {
                data_change_listener();
            });
            watch(dataofoneiteration, () => {
                finish_one_iteration_listener();
            });
            watch(dataofoneroute, () => {
                finish_one_route_listener();
            });
        });
        const data_change_listener = () => {
            const titletext = "路径序号和最优路径长度";
            const chart = path_number_and_optimal_path_length_chart.value;
            // debugger
            if (chart) {
                console.log("dataOfAllResults", dataOfAllResults);
                const data: [number, number][] = dataOfAllResults.map((a) => [
                    a.current_search_count,
                    a.globalbestlength,
                ]);
                console.log(data);

                drawlinechart({
                    // xAxis_min: 0,
                    yAxis_min: 0,
                    titletext,
                    data: data,
                    chart: chart,
                });
            }
        };
        const finish_one_iteration_listener = () => {
            const titletext = "迭代轮次和相对信息熵";
            const chart = iteration_rounds_and_information_entropy_chart.value;
            if (chart) {
                console.log("dataofoneiteration", dataofoneiteration);
                const data: [number, number][] = dataofoneiteration.map((a) => [
                    a.current_iterations,
                    a.population_relative_information_entropy,
                ]);
                console.log(data);
                drawlinechart({
                    // xAxis_min: 0,
                    yAxis_min: 0,
                    titletext,
                    data: data,
                    chart: chart,
                });
            }
        };

        const finish_one_route_listener = () => {
            const titletext = "路径序号和当前路径长度";
            const chart = path_number_and_current_path_length_chart.value;
            if (chart) {
                console.log("dataofoneroute", dataofoneroute);
                const data: [number, number][] = dataofoneroute.map((a) => [
                    a.current_search_count,
                    a.totallength,
                ]);
                console.log(data);
                drawlinechart({
                    // xAxis_min: 0,
                    yAxis_min: 0,
                    titletext,
                    data: data,
                    chart: chart,
                });
            }
        };

        const runtsp = async () => {
            console.log("搜索轮次", searchrounds.value);
            console.log("蚂蚁数量", numberofeachround.value);
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
                // const onFinishIteration = () => {
                //
                // };
                const runner = await TSP_before_Start({
                    // onFinishIteration,
                    pheromonevolatilitycoefficientR1,
                    onGlobalBestRouteChange,
                    nodecoordinates,
                    numberofants,
                    // roundofsearch,
                    onLatestRouteChange,
                });
                console.log("runner", runner);

                await runner.on_finish_one_route(finish_one_route_listener);
                await runner.on_finish_one_iteration(
                    finish_one_iteration_listener
                );
                await tsp_runner_run_async(runner, roundofsearch, numberofants);
                is_running.value = false;
                // runner.onDataChange(data_change_listener);
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
