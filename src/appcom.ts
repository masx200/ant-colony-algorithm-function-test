import {
    computed,
    ComputedRef,
    defineComponent,
    onMounted,
    reactive,
    ref,
    watch,
} from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "../test/asserttrue";
import { create_TSP_Worker_comlink } from "./create_TSP_Worker_comlink";
import { DataOfSummarize } from "./DataOfSummarize";
import datatable from "./datatable.vue";
import {
    defaultnumberofants,
    defaultsearchrounds,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import { draw_iteration_rounds_and_information_entropy_chart } from "./draw_iteration_rounds_and_information_entropy_chart";
import { draw_iteration_rounds_and_relative_deviation_from_optimal_chart } from "./draw_iteration_rounds_and_relative_deviation_from_optimal_chart";
import { draw_path_number_and_current_path_length_chart } from "./draw_path_number_and_current_path_length_chart";
import { draw_path_number_and_optimal_path_length_chart } from "./draw_path_number_and_optimal_path_length_chart";
import { TSP_cities_data } from "./TSP_cities_data";
import { TSP_RunnerRef, TSP_workerRef } from "./TSP_workerRef";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote"; // import { TSPRunner } from "../functions/createTSPrunner";
import { use_escharts_container_pair } from "./use_escharts_container_pair"; // import { TSPRunner } from "../functions/createTSPrunner";
import { use_run_tsp } from "./use_run_tsp";
import { use_submit } from "./use_submit";

export default defineComponent({
    components: { datatable },
    setup() {
        function onreceivedataofoneroute(data: DataOfFinishOneRoute) {
            console.log("onreceivedataofoneroute");
            dataofoneroute.push(data);
            console.log(dataofoneroute);
            console.log(oneroutetablebody);
        }

        function clearDataOfOneRoute() {
            dataofoneroute.length = 0;
        }
        const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);
        const oneroutetablebody = computed<
            [number, number, number, number, number, number][]
        >(() => {
            return dataofoneroute.map((data, index) => {
                return [
                    index + 1,
                    data.totallength,
                    data.countofloops,
                    //找到这一条的路径的数据
                    data.globalbestlength,
                    // dataOfAllResults[index].globalbestlength,
                    data.timems / 1000,
                    data.total_time_ms / 1000,
                ];
            });
        });
        const oneroutetableheads = [
            "序号",
            "当前长度",
            "循环次数",

            "全局最优长度",
            "当前耗时秒",
            "总计耗时秒",
        ];

        console.log(dataofoneroute, oneroutetablebody);

        function onreceivedataofoneIteration(data: DataOfFinishOneIteration) {
            console.log("onreceivedataofoneIteration");
            dataofoneiteration.push(data);
            console.log(dataofoneiteration);
            console.log(oneiterationtablebody);
        }

        async function TSP_before_Start({
            // onFinishIteration,
            onGlobalBestRouteChange,
            onLatestRouteChange,
            // roundofsearch,
            nodecoordinates,
            numberofants,
            pheromonevolatilitycoefficientR1,
        }: {
            // onFinishIteration: () => void;
            pheromonevolatilitycoefficientR1: number;
            onGlobalBestRouteChange: (
                globalbestroute: number[],
                nodecoordinates: Nodecoordinates
            ) => void;
            onLatestRouteChange: (
                latestroute: number[],
                nodecoordinates: Nodecoordinates
            ) => void;
            // roundofsearch: number;
            numberofants: number;
            nodecoordinates: Nodecoordinates;
        }): Promise<TSP_Worker_Remote> {
            console.log("TSP_before_Start", nodecoordinates);
            TSP_RunnerRef.value ||= await initializeTSP_runner({
                // onFinishIteration,
                pheromonevolatilitycoefficientR1,
                onGlobalBestRouteChange,
                onLatestRouteChange,
                nodecoordinates,
                numberofants,
            });
            // TSP_RunnerRef.value?.runIterations(roundofsearch);
            const runner = TSP_RunnerRef.value;
            return runner;
        }

        async function initializeTSP_runner({
            // onFinishIteration,
            nodecoordinates,
            numberofants,
            onGlobalBestRouteChange,
            onLatestRouteChange,
            pheromonevolatilitycoefficientR1,
        }: {
            // onFinishIteration: () => void;
            pheromonevolatilitycoefficientR1: number;
            nodecoordinates: Nodecoordinates;
            numberofants: number;
            onGlobalBestRouteChange: (
                globalbestroute: number[],
                nodecoordinates: Nodecoordinates
            ) => void;
            onLatestRouteChange: (
                latestroute: number[],
                nodecoordinates: Nodecoordinates
            ) => void;
        }): Promise<TSP_Worker_Remote> {
            const runner = await create_TSP_Worker_comlink({
                pheromonevolatilitycoefficientR1,
                nodecoordinates,
                numberofants,
            });
            console.log(runner);
            await runner.on_best_change((data) => {
                onreceiveDataOfGlobalBest(data);
                onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
            });
            // runner.on_finish_one_route(onreceivedataofoneroute);
            await runner.on_finish_one_route((data) => {
                onreceivedataofoneroute(data);
                const { route } = data;
                onLatestRouteChange(route, nodecoordinates);
            });
            // runner.onDataChange(onDataChange);
            // runner.on_finish_one_iteration(onDataChange);
            // runner.on_finish_one_route(onDataChange);
            await runner.on_finish_one_iteration((data) => {
                onreceivedataofoneIteration(data);
                // onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
            });
            // debugger
            return runner;
        }

        function onreceiveDataOfGlobalBest(data: DataOfSummarize) {
            console.log("onreceiveDataOfGlobalBest");
            dataofresult.value = data;
            //current_search_count:相同的可能有两条,有一条是路径构建完成,另一条是一轮迭代完成,
            // dataOfAllResults.push(Object.assign({}, data));
            //current_search_count从1开始
            //取迭代次数多的那个
            //初始可能为空

            console.log(dataofresult);
            console.log(resultTableBody);
        }

        function clearDataOfResult() {
            dataofresult.value = undefined;
        }
        const resultTableHeads = [
            "全局最优长度",
            "找到最优解的耗时秒",
            "总共耗时秒",
            "总路径数量",
            "总迭代次数",
            "全局最优路径",
        ];
        const resultTableBody: ComputedRef<
            [number, number, number, number, number, string][]
        > = computed(() => {
            const result = dataofresult.value;
            return result
                ? [
                      [
                          result.globalbestlength,
                          result.time_of_best_ms / 1000,
                          result.total_time_ms / 1000,
                          result.current_search_count,
                          result.current_iterations,
                          JSON.stringify(result.globalbestroute),
                      ],
                  ]
                : [];
        });

        const dataofresult = ref<DataOfSummarize>();

        function TSP_terminate() {
            console.log("TSP_terminate");
            TSP_workerRef.value?.terminate();
            TSP_workerRef.value = undefined;
            clearDataOfOneRoute();
            clearDataOfOneIteration();
            clearDataOfResult();
            TSP_RunnerRef.value = undefined;
        }
        function clearDataOfOneIteration() {
            dataofoneiteration.length = 0;
        }
        const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
        const oneiterationtablebody = computed<
            [
                number,
                number,
                number,
                boolean,
                number,
                number,
                number,
                number,
                number,
                number
            ][]
        >(() => {
            return dataofoneiteration.map((data, index) => {
                return [
                    index + 1,
                    data.population_relative_information_entropy,
                    data.randomselectionprobability,
                    data.ispheromoneDiffusion,
                    data.pheromoneDiffusionProbability,
                    data.timems / 1000,
                    data.optimallengthofthisround,
                    data.relative_deviation_from_optimal,
                    //找到这一轮的迭代的数据
                    data.globalbestlength,
                    data.locally_optimized_length,
                ];
            });
        });
        const oneiterationtableheads = [
            "序号",
            "信息熵",
            "随机选择概率",
            "是否信息素扩散",
            "信息素扩散概率",

            "耗时秒",
            "迭代最优长度",
            "与最优的相对偏差",
            "全局最优长度",
            "局部优化长度",
        ];

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
        const {
            container:
                container_of_iteration_rounds_and_relative_deviation_from_optimal,
            chart: iteration_rounds_and_relative_deviation_from_optimal_chart,
        } = use_escharts_container_pair();
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
            draw_iteration_rounds_and_relative_deviation_from_optimal_chart(
                iteration_rounds_and_relative_deviation_from_optimal_chart,
                dataofoneiteration
            );
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
        function reset() {
            // const element = selecteleref.value;
            // element && (element.selectedIndex = 0);
            // const nodecoordinates = TSP_cities_map.get(element?.value || "");
            TSP_terminate();
            disablemapswitching.value = false;
            is_running.value = false;
        }
        return {
            container_of_iteration_rounds_and_relative_deviation_from_optimal,
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
