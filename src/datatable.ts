import { computed, defineComponent } from "vue";
import { dataofoneroute } from "./dataofoneroute";
const tablebody = computed<[number, number, number, number, string][]>(() => {
    return dataofoneroute.map((data, index) => {
        return [
            index,
            data.totallength,
            data.loops,
            data.timems / 1000,
            JSON.stringify(data.route),
        ];
    });
});
console.log(dataofoneroute, tablebody);
export default defineComponent({
    setup() {
        const tableheads = ["序号", "长度", "循环次数", "耗时秒", "路径"];

        return { tableheads, tablebody };
    },
});
