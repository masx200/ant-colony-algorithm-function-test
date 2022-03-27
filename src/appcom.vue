<template>
    <div :class="{ 'container-top': navbar_float }">
        <Progresselement
            :class="{ 'fixed-top-navbar': navbar_float }"
            :percentage="percentage"
            :indeterminate="indeterminate"
        />
        <h1>自适应+奖惩+蚁群+k-opt 测试</h1>
        <hr />
        <span>选择城市地图</span>
        <select
            ref="selecteleref"
            :disabled="disablemapswitching"
            @change="submit_select_node_coordinates"
        >
            <option
                v-for="item in TSP_cities_data"
                v-bind:key="item"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
        <br />
        <button v-text="'重置'" @click="resethandler" />
        <button
            v-text="'停止'"
            @click="stop_handler"
            :disabled="disable_stop"
        />
        <hr />
        <span>局部信息素挥发率</span>
        <el-input-number
            :controls="false"
            step-strictly
            :step="0.001"
            v-model.number="local_pheromone_volatilization_rate"
            :disabled="disablemapswitching"
            :min="0.001"
            :max="0.5"
        /><br />
        <span>蚂蚁数量</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="numberofeachround"
            :disabled="disablemapswitching"
            :min="2"
            :controls="false"
        /><br />
        <hr />
        <el-radio-group v-model="radio_run_way" :disabled="is_running">
            <el-radio :label="run_way_time">按照时间</el-radio>
            <el-radio :label="run_way_round">按照轮次</el-radio>
        </el-radio-group>
        <div v-show="radio_run_way === run_way_round">
            <span>迭代轮次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="searchrounds"
                :min="1"
                :controls="false"
                :disabled="is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="runtsp_by_search_rounds"
                :disabled="is_running"
            />
        </div>
        <div v-show="radio_run_way === run_way_time">
            <span>迭代时间秒</span>
            <el-input-number
                step-strictly
                :step="0.001"
                v-model.number="search_time_seconds"
                :min="1"
                :controls="false"
                :disabled="is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="run_tsp_by_time"
                :disabled="is_running"
            />
        </div>
        <hr />

        <div class="chartcontainer" style="">
            <!-- 全局最优解的图 -->
            <div
                class="singlechart"
                style=""
                ref="container_of_best_chart"
            ></div>
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
        <div class="chartcontainer" style="">
            <!-- 迭代轮次和相对信息熵的图表 -->
            <div
                class="singlechart"
                style=""
                ref="container_of_iteration_rounds_and_information_entropy_chart"
            ></div>
        </div>
        <hr />
        <div
            class="singlechart"
            style=""
            ref="container_of_path_number_and_optimal_path_length_chart"
        ></div>
        <hr />

        <!-- //汇总结果 -->
        <Datatable
            :tableheads="resultTableHeads"
            :tablebody="resultTableBody"
        />
        <!-- 拆分表格 -->
        <hr />
        <Datatable
            :tableheads="globalBestRouteHeads"
            :tablebody="globalBestRouteBody"
        />

        <hr />
        <Datatable
            :tableheads="TableHeadsOfHistoryOfBest"
            :tablebody="TableBodyOfHistoryOfBest"
        />
        <hr />
        <!-- 迭代结果 -->
        <Datatable
            :tableheads="oneiterationtableheads"
            :tablebody="oneiterationtablebody"
        />
        <hr />
        <!-- 路径结果 -->
        <Datatable
            :tableheads="oneroutetableheads"
            :tablebody="oneroutetablebody"
        />
    </div>
</template>
<script lang="ts" src="./appcom.ts"></script>
<style scoped>
.fixed-top-navbar {
    z-index: 10;
    /* height: 30px; */
    position: fixed;
    /* width: 100%; */
    top: 0%;
    left: 0;
}
.singlechart {
    min-height: 300px;
    max-width: 100%;
    width: 100%;
    min-width: 300px;
    /* max-height: 100%; */
    height: 600px;
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
@media screen and (max-width: 400px) {
    .singlechart {
        max-height: 400px;
        height: 400px;
    }
}
@media screen and (max-width: 500px) {
    .singlechart {
        height: 500px;
        max-height: 500px;
    }
}
@media screen and (max-width: 600px) {
    .singlechart {
        height: 600px;
        max-height: 600px;
    }
}
/* 大于600 */
@media screen and (min-width: 600px) {
    .singlechart {
        max-height: 600px;
    }
}
/* 大于1000 */
@media screen and (min-width: 1000px) {
    .chartcontainer {
        flex-direction: row;
    }
}
.container-top {
    margin-top: 30px;
}
</style>
