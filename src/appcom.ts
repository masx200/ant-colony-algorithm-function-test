import { defineComponent, onMounted, ref, watch } from "vue";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "../test/asserttrue";
import Datatable from "./Datatable-com.vue";
import {
    defaultnumberofants,
    defaultsearchrounds,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
import { draw_best_route_debounced } from "./draw_best_route_debounced";
import { draw_iteration_rounds_and_information_entropy_chart_debounced } from "./draw_iteration_rounds_and_information_entropy_chart_debounced";
import { draw_latest_route_debounced } from "./draw_latest_route_debounced";
import { draw_path_number_and_current_path_length_chart_debounced } from "./draw_path_number_and_current_path_length_chart_debounced";
import { draw_path_number_and_optimal_path_length_chart_debounced } from "./draw_path_number_and_optimal_path_length_chart_debounced";
import Progresselement from "./Progress-element.vue";
import { StopTSPWorker } from "./StopTSPWorker";
// import { draw_path_number_and_optimal_path_length_chart } from "./draw_path_number_and_optimal_path_length_chart";
import { TSP_cities_data } from "./TSP_cities_data";
import { TSP_Reset } from "./TSP_Reset";
import { use_data_of_one_iteration } from "./use_data_of_one_iteration";
import { use_data_of_one_route } from "./use_data_of_one_route";
import { use_data_of_summary } from "./use_data_of_summary";
import { use_escharts_container_pair } from "./use_escharts_container_pair"; // import { TSPRunner } from "../functions/createTSPrunner";
import { use_initialize_tsp_runner } from "./use_initialize_tsp_runner";
import { use_run_tsp } from "./use_run_tsp";
import { use_submit } from "./use_submit";
import { use_tsp_before_start } from "./use_tsp_before_start";
export default defineComponent({
    components: { Datatable, Progresselement: Progresselement },
    setup() {
        /* 进度从0到100 */
        const percentage = ref(0);
        const {
            oneiterationtableheads,
            onreceivedataofoneIteration,
            clearDataOfOneIteration,
            dataofoneiteration,
            oneiterationtablebody,
        } = use_data_of_one_iteration();

        //
        const {
            dataofoneroute,
            oneroutetablebody,
            onreceivedataofoneroute,
            clearDataOfOneRoute,
            oneroutetableheads,
        } = use_data_of_one_route();
        //
        console.log(dataofoneroute, oneroutetablebody);

        const {
            dataofresult,
            onreceiveDataOfGlobalBest,
            clearDataOfResult,
            resultTableHeads,
            resultTableBody,
            globalBestRouteBody,
            globalBestRouteHeads,
        } = use_data_of_summary();
        console.log(dataofresult, resultTableBody);
        const initializeTSP_runner = use_initialize_tsp_runner({
            onreceiveDataOfGlobalBest,
            onreceivedataofoneroute,
            onreceivedataofoneIteration,
        });
        const TSP_before_Start = use_tsp_before_start(initializeTSP_runner);

        const TSP_terminate = () =>
            TSP_Reset({
                clearDataOfOneRoute,
                clearDataOfOneIteration,
                clearDataOfResult,
            });

        console.log(dataofoneiteration, oneiterationtableheads);

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
        // const {
        //     container:
        //         container_of_iteration_rounds_and_relative_deviation_from_optimal,
        //     chart: iteration_rounds_and_relative_deviation_from_optimal_chart,
        // } = use_escharts_container_pair();
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

        const submit = use_submit({
            selecteleref,
            chart_store_latest,
            chart_store_best,
        });
        onMounted(() => {
            reset();
            console.log(selecteleref);
            const element = selecteleref.value;
            element && (element.selectedIndex = 0);

            // console.log(containertoechart);
            console.log(container_of_best_chart);
            console.log(container_of_latest_chart);

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
                draw_latest_route_debounced(
                    route,
                    nodecoordinates,
                    latestchart
                );
            }
        };

        const onGlobalBestRouteChange = (
            route: number[],
            nodecoordinates: Nodecoordinates
        ) => {
            asserttrue(route.length > 0);
            asserttrue(route.length === nodecoordinates.length);
            const chart = chart_store_best.value;
            if (chart) {
                draw_best_route_debounced(route, nodecoordinates, chart);
            }
        };
        onMounted(() => {
            // watch(dataOfAllResults, () => {
            //     data_change_listener();
            // });
            watch(dataofoneiteration, () => {
                finish_one_iteration_listener();
            });
            watch(dataofoneroute, () => {
                finish_one_route_listener();
                data_change_listener();
            });
        });
        const data_change_listener = () => {
            draw_path_number_and_optimal_path_length_chart_debounced(
                path_number_and_optimal_path_length_chart,
                dataofoneroute
            );
        };
        const finish_one_iteration_listener = () => {
            draw_iteration_rounds_and_information_entropy_chart_debounced(
                iteration_rounds_and_information_entropy_chart,
                dataofoneiteration
            );
            // draw_iteration_rounds_and_relative_deviation_from_optimal_chart(
            //     iteration_rounds_and_relative_deviation_from_optimal_chart,
            //     dataofoneiteration
            // );
        };

        const finish_one_route_listener = () => {
            draw_path_number_and_current_path_length_chart_debounced(
                path_number_and_current_path_length_chart,
                dataofoneroute
            );
        };
        const onprogress = (p: number) => {
            percentage.value = p;
        };
        const runtsp = use_run_tsp({
            onprogress,
            TSP_before_Start,
            searchrounds,
            numberofeachround,
            selecteleref,
            local_pheromone_volatilization_rate,
            disablemapswitching,
            is_running,
            onGlobalBestRouteChange,
            onLatestRouteChange,
            finish_one_route_listener,
            finish_one_iteration_listener,
        });
        const resetold = () => {
            TSP_terminate();
            disablemapswitching.value = false;
            is_running.value = false;
        };
        const reset = () => {
            percentage.value = 0;
            resetold();
        };
        const stop_handler = () => {
            StopTSPWorker();
        };
        return {
            stop_handler,
            globalBestRouteBody,
            globalBestRouteHeads,
            // container_of_iteration_rounds_and_relative_deviation_from_optimal,
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
            percentage,
        };
    },
});
