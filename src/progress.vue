<template>
    <div class="fixed-top-navbar">
        <el-progress :percentage="percentage" />
    </div>
</template>
<script lang="ts">
import { ElProgress } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
    components: { ElProgress },
    props: { percentage: { type: Number, required: true } },
});
</script>
<style scoped>
.fixed-top-navbar {
    height: 50px;
    position: fixed;
    width: 100%;
    top: 0%;
    left: 0;
}
</style>
