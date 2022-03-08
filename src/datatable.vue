<template>
    <table border="1">
        <tr>
            <th v-for="(item, index) of tableheads" :key="index">{{ item }}</th>
        </tr>
        <tr v-for="(item, index) of tablebody" :key="index">
            <td v-for="(item2, index2) of item" :key="index2">{{ item2 }}</td>
        </tr>
    </table>
</template>
<script lang="ts" src="./datatable.ts"></script>
