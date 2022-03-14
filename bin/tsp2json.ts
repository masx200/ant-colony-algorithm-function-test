#!/usr/bin/env node
import parse from "@masx200/mini-cli-args-parser";
import assert from "assert";
import fsextra from "fs-extra";
import path from "path";
import process from "process";
import { findfiles } from "./findfiles";
("use strict");
process.on("unhandledRejection", (err) => {
    throw err;
});
console.log("tsp2json");
const extension = "tsp";
const args = process.argv.slice(2);
const opts = parse(args);

console.log(opts);
const { inputdir } = opts;
assert(typeof inputdir === "string");

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
