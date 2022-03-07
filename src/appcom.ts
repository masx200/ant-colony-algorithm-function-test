import { defineComponent, onMounted, reactive, ref } from "vue";
import { TSP_cities_map } from "./TSP_cities_map";
import { createchartofcontainer } from "./createchartofcontainer";
import { showanddrawrandomgreedyoftsp } from "./showanddrawrandomgreedyoftsp";
const TSP_cities_data = Array.from(TSP_cities_map.entries());
console.log(TSP_cities_data);
// const containertoechart = new WeakMap<
//     HTMLElement,
//     ReturnType<typeof createchartofcontainer>
// >();
import datatable from "./datatable.vue";
export default defineComponent({
    components: { datatable },
    setup() {
        const disablemapswitching = ref(false);
        const searchround = ref(1);
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
                const bestchart = chartstore.best;
                if (bestchart) {
                    showanddrawrandomgreedyoftsp(nodecoordinates, bestchart);
                }
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
            if (containerofbest && containeroflatest) {
                const bestchart = createchartofcontainer(containerofbest);
                const latestchart = createchartofcontainer(containeroflatest);
                chartstore.latest = latestchart;
                chartstore.best = bestchart;
            }
            // setTimeout(() => {
            submit();
            // });
        });
        const runtsp = () => {
            console.log("搜索轮次", searchround.value);
            const roundofsearch = searchround.value;
            if (roundofsearch > 0) {
                disablemapswitching.value = true;
            } else {
                searchround.value = 1;
            }
        };
        return {
            disablemapswitching,
            runtsp,
            searchround,
            TSP_cities_data,
            submit,
            selecteleref,
            chartofbestref,
            chartoflatestref,
        };
    },
});
