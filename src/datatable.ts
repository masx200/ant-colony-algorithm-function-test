import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const tableheads = ["序号", "长度", "循环次数", "耗时秒", "路径"];
        const tablebody: [number, number, number, number, string][] = [];
        return { tableheads, tablebody };
    },
});
