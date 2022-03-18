import { ComputedRef, defineComponent, onMounted, Ref, ref, watch } from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "../test/asserttrue";
import { DataOfSummarize } from "./DataOfSummarize";
import datatable from "./datatable.vue";
import {
    defaultnumberofants,
    defaultsearchrounds,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import { draw_iteration_rounds_and_information_entropy_chart } from "./draw_iteration_rounds_and_information_entropy_chart";
// import { draw_iteration_rounds_and_relative_deviation_from_optimal_chart } from "./draw_iteration_rounds_and_relative_deviation_from_optimal_chart";
import { draw_path_number_and_current_path_length_chart } from "./draw_path_number_and_current_path_length_chart";
import { draw_path_number_and_optimal_path_length_chart } from "./draw_path_number_and_optimal_path_length_chart";
import { TSP_cities_data } from "./TSP_cities_data";
import { use_data_of_one_iteration } from "./use_data_of_one_iteration";
import { use_data_of_one_route } from "./use_data_of_one_route";
import { use_data_of_summary } from "./use_data_of_summary";
import { use_escharts_container_pair } from "./use_escharts_container_pair"; // import { TSPRunner } from "../functions/createTSPrunner";
import { use_initialize_tsp_runner } from "./use_initialize_tsp_runner";
import { use_reset } from "./use_reset";
import { use_run_tsp } from "./use_run_tsp";
import { use_submit } from "./use_submit";
import { use_tsp_before_start } from "./use_tsp_before_start";
import { use_tsp_terminate } from "./use_tsp_terminate";

export default defineComponent({
    components: { datatable },
    setup() {
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
        }: {
            dataofresult: Ref<DataOfBestChange | undefined>;
            onreceiveDataOfGlobalBest: (data: DataOfSummarize) => void;
            clearDataOfResult: () => void;
            resultTableHeads: string[];
            resultTableBody: ComputedRef<
                [number, number, number, number, number, string][]
            >;
        } = use_data_of_summary();
        console.log(dataofresult, resultTableBody);
        const initializeTSP_runner = use_initialize_tsp_runner({
            onreceiveDataOfGlobalBest,
            onreceivedataofoneroute,
            onreceivedataofoneIteration,
        });
        const TSP_before_Start = use_tsp_before_start(initializeTSP_runner);

        const TSP_terminate = use_tsp_terminate({
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
            asserttrue(route.length > 0);
            asserttrue(route.length === nodecoordinates.length);
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
            draw_path_number_and_optimal_path_length_chart(
                path_number_and_optimal_path_length_chart,
                dataofoneroute
            );
        };
        const finish_one_iteration_listener = () => {
            draw_iteration_rounds_and_information_entropy_chart(
                iteration_rounds_and_information_entropy_chart,
                dataofoneiteration
            );
            // draw_iteration_rounds_and_relative_deviation_from_optimal_chart(
            //     iteration_rounds_and_relative_deviation_from_optimal_chart,
            //     dataofoneiteration
            // );
        };

        const finish_one_route_listener = () => {
            draw_path_number_and_current_path_length_chart(
                path_number_and_current_path_length_chart,
                dataofoneroute
            );
        };

        const runtsp = use_run_tsp({
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
        const reset = use_reset({
            TSP_terminate,
            disablemapswitching,
            is_running,
        });
        return {
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
        };
    },
});
