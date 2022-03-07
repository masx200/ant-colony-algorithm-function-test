<template>
    <h1>禁忌路径构建测试</h1>
    <h3>选择城市地图</h3>
    <select ref="selecteleref">
        <option
            v-for="item in TSP_cities_data"
            v-bind:key="item[0]"
            :value="item[0]"
        >
            {{ item[0] }}
        </option>
    </select>
    <button v-text="'确定'" @click="submit" />

    <hr />
    <div id="chartcontainer" style="">
        <div style="width: 500px; height: 500px" ref="chartofbestref"></div>
        <div style="width: 500px; height: 500px" ref="chartoflatestref"></div>
    </div>
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
