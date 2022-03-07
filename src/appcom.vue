<template>
    <h1>禁忌路径构建测试</h1>
    <hr />
    <h5>选择城市地图</h5>
    <select ref="selecteleref"  :disabled='disablemapswitching'>
        <option
            v-for="item in TSP_cities_data"
            v-bind:key="item[0]"
            :value="item[0]"
        >
            {{ item[0] }}
        </option>
    </select>
    <button v-text="'确定'" @click="submit" :disabled='disablemapswitching'/>
    <hr />
    <h5>搜索轮次</h5>
    <input v-model="searchround" />
    <button v-text="'运行'" @click="runtsp" />
    <hr />
    <div id="chartcontainer" style="">
        <div style="width: 500px; height: 500px" ref="chartofbestref"></div>
        <div style="width: 500px; height: 500px" ref="chartoflatestref"></div>
    </div>
    <datatable />
</template>
<script lang="ts" src="./appcom.ts"></script>
<style scoped>
#chartcontainer {
    display: flex;

    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
}
@media screen and (max-width: 1000px) {
    #chartcontainer {
        flex-direction: column;
    }
}
@media screen and (min-width: 1000px) {
    #chartcontainer {
        flex-direction: row;
    }
}
</style>
