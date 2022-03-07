import { defineComponent, Ref, ref } from "vue";
const tablebody: Ref<[number, number, number, number, string][]> = ref<
    [number, number, number, number, string][]
>([]);
export default defineComponent({
    setup() {
        const tableheads = ["序号", "长度", "循环次数", "耗时秒", "路径"];

        return { tableheads, tablebody };
    },
});
