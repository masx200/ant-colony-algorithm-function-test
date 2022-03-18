<template>
    <h1>自适应+奖惩+蚁群+k-opt 测试</h1>
    <hr />
    <span>选择城市地图</span>
    <select ref="selecteleref" :disabled="disablemapswitching" @change="submit">
        <option
            v-for="item in TSP_cities_data"
            v-bind:key="item[0]"
            :value="item[0]"
        >
            {{ item[0] }}
        </option>
    </select>

    <button v-text="'重置'" @click="reset" />
    <hr />
    <span>局部信息素挥发率</span>
    <input
        v-model.number="local_pheromone_volatilization_rate"
        :disabled="disablemapswitching"
    />
    <span>蚂蚁数量</span>
    <input v-model.number="numberofeachround" :disabled="disablemapswitching" />
    <span>迭代轮次</span>
    <input v-model.number="searchrounds" />

    <button v-text="'运行'" @click="runtsp" :disabled="is_running" />
    <hr />

    <div class="chartcontainer" style="">
        <!-- 全局最优解的图 -->
        <div class="singlechart" style="" ref="container_of_best_chart"></div>
        <!-- 最近一条路径的图 -->
    </div>
    <hr />
    <div class="singlechart" style="" ref="container_of_latest_chart"></div>
    <hr />
    <div class="chartcontainer" style="">
        <!-- 路径序号和当前路径长度的图表 -->
        <div
            class="singlechart"
            style=""
            ref="container_of_path_number_and_current_path_length_chart"
        ></div>
        <!-- 路径序号和最优路径长度的图表 -->
    </div>
    <hr />
    <div
        class="singlechart"
        style=""
        ref="container_of_path_number_and_optimal_path_length_chart"
    ></div>
    <hr />
    <div class="chartcontainer" style="">
        <!-- 迭代轮次和相对信息熵的图表 -->
        <div
            class="singlechart"
            style=""
            ref="container_of_iteration_rounds_and_information_entropy_chart"
        ></div>
    </div>
    <hr />
    <!-- //汇总结果 -->
    <datatable :tableheads="resultTableHeads" :tablebody="resultTableBody" />

    <hr />
    <!-- 迭代结果 -->
    <datatable
        :tableheads="oneiterationtableheads"
        :tablebody="oneiterationtablebody"
    />
    <hr />
    <!-- 路径结果 -->
    <datatable
        :tableheads="oneroutetableheads"
        :tablebody="oneroutetablebody"
    />
</template>
<script lang="ts" src="./appcom.ts"></script>
<style scoped>
.singlechart {
    max-width: 100%;
    width: 100%;

    max-height: 100%;
}
.chartcontainer {
    max-width: 100%;
    display: flex;
    max-height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
}
@media screen and (max-width: 1000px) {
    /* 小于1000 */
    .chartcontainer {
        flex-direction: column;
    }
}
/* 小于600 */
@media screen and (max-height: 600px) {
    .singlechart {
        height: 100%;
    }
}
/* 大于600 */
@media screen and (min-height: 600px) {
    .singlechart {
        height: 600px;
    }
}
/* 大于1000 */
@media screen and (min-width: 1000px) {
    .chartcontainer {
        flex-direction: row;
    }
}
</style>
