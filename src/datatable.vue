<template>
    <table border="1">
        <tr>
            <th v-for="(item, index) of tableheads" :key="index">{{ item }}</th>
        </tr>
        <tr>
            <td>January</td>
            <td>$100</td>
            <td>$100</td>
            <td>$100</td>
            <td>$100</td>
        </tr>
    </table>
</template>
<script lang="ts" src="./datatable.ts"></script>
