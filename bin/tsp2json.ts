#!/usr/bin/env node
import parse from "@masx200/mini-cli-args-parser";
import assert from "assert";
import fsextra from "fs-extra";
import path from "path";
import process from "process";
//@ts-ignore
import { findfiles } from "./findfiles.ts";
("use strict");
process.on("unhandledRejection", (err) => {
    throw err;
});
console.log("tsp2json");
console.log("usage:");
console.log("tsp2json --inputdir=path/to/TSPLIB");
const extension = "tsp";
const args = process.argv.slice(2);
const opts = parse(args);

console.log(opts);
const { inputdir } = opts;
assert(typeof inputdir === "string", "arugments inputdir should not empty");

start(inputdir);
async function start(inputdir: string) {
    const dirpa = inputdir;
    const extreg = new RegExp(".(" + extension + ")$", "i");
    const dirpath = path.resolve(dirpa);
    await fsextra.ensureDir(dirpath);

    console.log("递归查找文件...", dirpath);
    //return
    const files = await findfiles(extreg, dirpath);

    //.then((files) => {
    console.log(files);
}
