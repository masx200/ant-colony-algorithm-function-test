<template>
    <table border="1">
        <tr>
            <th v-for="(item, index) of tableheads" :key="index">{{ item }}</th>
        </tr>
        <tr v-for="(item, index) of tablebody" :key="index">
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
            <td>{{ item[2] }}</td>
            <td>{{ item[3] }}</td>
            <td>{{ item[4] }}</td>
        </tr>
    </table>
</template>
<script lang="ts" src="./datatable.ts"></script>
